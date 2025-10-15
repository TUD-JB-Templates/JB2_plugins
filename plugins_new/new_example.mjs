const exampleStyle = {
  border: `rgb(12, 35, 64)`,
  header: `rgb(0, 118, 194)`,
  body: `rgb(255, 255, 255)`
}

const example = {
  name: "example",
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
      class: "admonition-example",
      icon: false,
      children: [
        {
          type: "admonitionTitle",
          class: "admonition-title-example",
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
      class: "example-container",
      children: [
        {
          type: "raw",
          lang: "typst",
          typst: `
          #let noteBlock(body, heading: [Note]) = [
            #block(
              fill: ${exampleStyle.header},
              stroke: (left: 1pt + ${exampleStyle.border}),
              width: 100%,
              inset: (x: 0.8em, y: 0.4em),
              above: 0.5em,
              below: 0em,
              strong(heading)
            )

            #block(
              fill: ${exampleStyle.body},
              stroke: (left: 1pt + ${exampleStyle.border}),
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
  name: "example",
  directives: [example]
};

export default plugin;