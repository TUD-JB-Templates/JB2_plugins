// plugins/aside.mjs
const asideTransform = {
  name: "aside-to-marge-note",
  doc: "Convert {aside} blocks into marge #note sidenotes for Typst PDF.",
  stage: "document",
  plugin: () => (tree) => {
    const isPDF = process.argv.some(a => /\bpdf\b/i.test(a));
    if (!isPDF) return;

    const A = v => Array.isArray(v) ? v : v ? [v] : [];
    const getText = (n) =>
      n?.type === "text" ? (n.value ?? "") : A(n?.children).map(getText).join("");

    const isAside = (n) =>
      n?.type === "aside" ||
      (n?.type === "admonition" &&
       (n.kind === "aside" ||
        (Array.isArray(n.classes) && n.classes.includes("admonition-aside"))));

    const rootChildren = tree.children?.[0]?.children || [];

    for (let i = 0; i < rootChildren.length; i++) {
      const n = rootChildren[i];
      if (!isAside(n)) continue;

      const kids = A(n.children);
      const titleIdx = kids.findIndex(k => k?.type === "admonitionTitle" || k?.type === "title");
      const title = titleIdx >= 0 ? getText(kids[titleIdx]).trim() : "";
      const body = kids.filter((_, idx) => idx !== titleIdx);

      // Bouw een synthetische node die exporter als `#note[...]` kan uitschrijven
      rootChildren[i] = {
        type: "rawTypst",
        value: `#note[${ title ? `*${title}* — ` : ""}]`,
        children: body
      };
    }
  },
};


const plugin = {
  name: "Conditional Aside Plugin",
  transforms: [asideTransform],
};

export default plugin;
