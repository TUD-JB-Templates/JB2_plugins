const intermezzoStyle = {
  border : `rgb(162, 0, 255)`, 
  header : `rgb(218,154,255)`,
  body : `rgb(255,255,255)`
}

const intermezzo = {
  name: "intermezzo",
  doc: "A custom admonition that uses a specific color.",
  arg: { type: String, doc: "The title of the admonition." },
  options: {
    collapsed: { type: Boolean, doc: "Whether to collapse the admonition." },
  },
  body: { type: String, doc: "The body of the directive." },
  run(data, vfile, ctx) {
    const title = data.arg.trim();
    const body = data.body.trim();

    // Define the inner admonition
    const admonition = {
      type: "admonition",
      kind: "note",
      class: "admonition-intermezzo",
      icon: false,
      children: [
        {
          type: "admonitionTitle",
          class: "admonition-title-intermezzo",
          children: ctx.parseMyst(`${title}`).children[0].children,
        },
        {
          type: "paragraph",
          children: ctx.parseMyst(body).children,
        },
      ],
    };

    // Wrap Typst + admonition in a container
    const container = {
      type: "div",
      class: "intermezzo-container",
      children: [
        {
          type: "raw",
          lang: "typst",
          typst: `
          #let noteBlock(body, heading: [Note]) = [
            #block(
              fill: ${intermezzoStyle.header},
              stroke: (left: 1pt + ${intermezzoStyle.border}),
              width: 100%,
              inset: (x: 0.8em, y: 0.4em),
              above: 0.5em,
              below: 0em,
              strong(heading)
            )

            #block(
              fill: ${intermezzoStyle.body},
              stroke: (left: 1pt + ${intermezzoStyle.border}),
              width: 100%,
              inset: (x: 0.8em, y: 0.6em),
              above: 0em,
              below: 0.5em,
              body
            )
          ]`,
        },
        admonition,
        {
          type: "raw",
          lang: "typst",
          typst: `#let noteBlock(body, heading: [Note]) = admonition(body, heading: heading, color: blue)`,
        }
      ],
    };

    return [container];
  },
};

const plugin = {
  name: "intermezzo",
  directives: [intermezzo]
};

export default plugin;