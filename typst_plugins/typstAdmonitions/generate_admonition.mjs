import fs from "fs";
import path from "path";

// helper to convert "#RRGGBB" or "rgb(r,g,b)" to Typst rgb()
function toTypstRgb(colorStr) {
  colorStr = colorStr.trim();
  if (colorStr.startsWith("#")) {
    // hex: "#RRGGBB"
    const r = parseInt(colorStr.slice(1, 3), 16);
    const g = parseInt(colorStr.slice(3, 5), 16);
    const b = parseInt(colorStr.slice(5, 7), 16);
    return `rgb(${r},${g},${b})`;
  } else if (colorStr.startsWith("rgb")) {
    // already in "rgb(r,g,b)" format
    return colorStr;
  } else {
    // fallback: assume named color like "red"
    return colorStr;
  }
}

export function generateTypstElement(name, borderColor, headerColor, bodyColor, title, body) {
  const bodyText = Array.isArray(body) ? body.join("\n") : body;
  const esc = str => str.replace(/"/g, '\\"');

  return `
// Admonition: ${name}

#import "components/admonition.typ": make_admonition

#make_admonition(
  "${esc(title)}",
  "${esc(bodyText)}",
  (border: ${toTypstRgb(borderColor)}, header: ${toTypstRgb(headerColor)}, body: ${toTypstRgb(bodyColor)})
)
  `.trim();
}

function cleanCssColor(colorStr) {
  // Remove !important and any extra whitespace
  return colorStr.replace(/!important/g, "").trim();
}

export function getAdmonitionColors(cssFile, admonitionName) {
  const css = fs.readFileSync(path.resolve(cssFile), "utf8");

  const asideRegex = new RegExp(
    `aside\\.admonition-${admonitionName}\\s*{([\\s\\S]*?)}`
  );
  const asideMatch = css.match(asideRegex);
  if (!asideMatch) throw new Error(`No CSS found for aside.admonition-${admonitionName}`);

  const asideContent = asideMatch[1];

  const borderMatch = asideContent.match(/border-color\s*:\s*([^;]+);/);
  const bodyMatch = asideContent.match(/background-color\s*:\s*([^;]+);/);

  const headerRegex = new RegExp(
    `aside\\.admonition-${admonitionName}\\s*>\\s*div:first-child\\s*{([\\s\\S]*?)}`
  );
  const headerMatch = css.match(headerRegex);
  const headerContent = headerMatch ? headerMatch[1] : "";
  const headerColorMatch = headerContent.match(/background-color\s*:\s*([^;]+);/);

  return {
    border: borderMatch ? cleanCssColor(borderMatch[1]) : "#000000",
    body: bodyMatch ? cleanCssColor(bodyMatch[1]) : "#fa60b7ff",
    header: headerColorMatch ? cleanCssColor(headerColorMatch[1]) : "#f0f0f0",
  };
}

export const generateTypstNode = (val) => {
  let result = {
    type: 'raw',
    lang: 'typst',
    typst: val
  }
  return result
}
