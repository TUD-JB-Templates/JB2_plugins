import { generateTypstElement, getAdmonitionColors } from "./typstAdmonitions/generate_admonition.mjs";

const intermezzoColours = getAdmonitionColors("style/custom.css", "intermezzo");
const typstCode1 = generateTypstElement(
  "intermezzo",
  intermezzoColours.border,
  intermezzoColours.header,
  intermezzoColours.body,
  "Intermezzo",
  ["This is an intermezzo block.", "Multiple lines allowed."]
);

const asideTransform = {
  name: "aside-to-typst",
  doc: "Convert {aside} blocks into marge #note sidenotes for Typst PDF.",
  stage: "document",
  plugin: () => (tree) => {

    const isPDF = process.argv.some(arg => arg.includes("typst"));

    if (!isPDF) return;

    // to test, we want to just replace the entire tree with a raw typst node
  },
};

const plugin = {
  name: "Conditional Aside Plugin",
  transforms: [asideTransform],
};

export default plugin;
