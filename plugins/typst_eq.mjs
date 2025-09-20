// plugins/typst_eq.mjs
// plugin to convert missing latex symbols in typst

import fs from 'node:fs';
import path from 'node:path';

const DEFAULTS = {
  "\\\\oiiint": "∰",
  "\\\\oiint": "∯",
  "\\\\iiint": "∭",
  "\\\\iint": "∬",
  "\\\\oint": "∮",
  "\\\\int": "∫",
  "\\\\sum": "∑",
  "\\\\prod": "∏",
  "\\\\rightarrow": "→",
  "\\\\leftarrow": "←",
  "\\\\leftrightarrow": "↔",
  "\\\\Rightarrow": "⇒",
  "\\\\Leftarrow": "⇐",
  "\\\\Leftrightarrow": "⇔",
  "\\\\mapsto": "↦",
  "\\\\leqslant": "≤",
  "\\\\leq": "≤",
  "\\\\geqslant": "≥",
  "\\\\geq": "≥",
  "\\\\neq": "≠",
  "\\\\approx": "≈",
  "\\\\sim": "∼",
  "\\\\propto": "∝",
  "\\\\equiv": "≡",
  "\\\\infty": "∞",
  "\\\\partial": "∂",
  "\\\\nabla": "∇",
  "\\\\emptyset": "∅",
  "\\\\varnothing": "∅",
  "\\\\cup": "∪",
  "\\\\cap": "∩",
  "\\\\setminus": "∖",
  "\\\\mathbb\\{R\\}": "ℝ",
  "\\\\mathbb\\{N\\}": "ℕ",
  "\\\\mathbb\\{Z\\}": "ℤ",
  "\\\\mathbb\\{Q\\}": "ℚ",
  "\\\\mathbb\\{C\\}": "ℂ"
};

function loadMapping(mappingPath, inlineMap) {
  if (mappingPath) {
    // resolve t.o.v. project root (cwd)
    const abs = path.isAbsolute(mappingPath) ? mappingPath : path.resolve(process.cwd(), mappingPath);
    return JSON.parse(fs.readFileSync(abs, 'utf8'));
  }
  return inlineMap ?? DEFAULTS;
}

function makeRewriter({ mappingPath, mapping, accents = 'typst' } = {}) {
  const mapObj = loadMapping(mappingPath, mapping);

  const pairs = Object.entries(mapObj).sort((a, b) => b[0].length - a[0].length);
  const literalRewrite = (src) => {
    let out = src;
    for (const [pat, repl] of pairs) out = out.replace(new RegExp(pat, 'g'), repl);
    return out;
  };

  const accent = (cmd, name) => (accents === 'typst' ? `${cmd}(${name})` : name);
  const structuralRewrite = (src) =>
    src
      .replace(/\\hat\s*\{([^{}]+)\}/g, (_m, x) => accent('hat', x))
      .replace(/\\vec\s*\{([^{}]+)\}/g, (_m, x) => accent('vec', x))
      .replace(/\\bar\s*\{([^{}]+)\}/g, (_m, x) => accent('overbar', x))
      .replace(/\\overline\s*\{([^{}]+)\}/g, (_m, x) => accent('overline', x));

  return (math) => structuralRewrite(literalRewrite(math));
}

/** @type {import('myst-common').MystPlugin} */
const plugin = {
  name: 'latex-typst-fallback',
  transforms: [
    {
      name: 'latex-typst-fallback',
      stage: 'document',
      plugin: (opts = {}, utils) => {
        const rewrite = makeRewriter(opts);
        return (tree) => {
          utils.selectAll('inlineMath, math', tree).forEach((node) => {
            node.value = rewrite(node.value ?? '');
          });
        };
      },
    },
  ],
};

export default plugin;
