// Add 'example' directive support for PDF formatting in Myst. Transform only works if --pdf flag used during build. e.g. myst build --pdf 
// Based on https://next.jupyterbook.org/plugins/directives-and-roles#create-a-custom-admonition
// Add CSS for formatting

// Helpers
const parseInline = (s, ctx) => {
  const txt = (s || "").trim();
  if (!txt) return [{ type: "text", value: "" }];
  const tree = ctx.parseMyst(txt);
  const first = tree?.children?.[0];
  return (first?.type === "paragraph" ? first.children : tree?.children) ?? [{ type: "text", value: txt }];
};

const parseBlocks = (s, ctx) => {
  const tree = ctx.parseMyst(s || "");
  const kids = tree?.children ?? [];
  return kids.length ? kids : [{ type: "paragraph", children: [{ type: "text", value: (s || "").trim() }] }];
};

const example = {
  name: "example",
  doc: "Custom admonition that tolerates block content (e.g. figures).",
  arg: { type: String, doc: "Title" },
  options: { collapsed: { type: Boolean, doc: "Collapse state" } },
  body: { type: String, doc: "Body" },
  run(data, vfile, ctx) {
    const title = (data.arg || "").trim();
    const body = (data.body || "").trim();

    // Belangrijk: gebruik een "bekende" soort, bv. "note"
    // (exporter kent 'note'/'tip'/'warning'/'info' etc.)
    const kind = "note";

    const node = {
      type: "admonition",
      kind,                     // <-- geen "admonition" maar bv. "note"
      classes: ["admonition-example"],
      class: "admonition-example", // <-- zet ook 'class' voor compat
      icon: false,
      children: [
        { type: "admonitionTitle", classes: ["admonition-title-example"], children: parseInline(title, ctx) },
        ...parseBlocks(body, ctx), // <-- laat blocks zoals figure intact
      ],
    };

    return [node];
  }
};


const plugin = {
  name: "example-plugin",
  directives: [example],
};

export default plugin;
