// template_admonition.typ
#let make_admonition(title, body, colors) = {
  block(
    fill: rgb(colors.header),
    stroke: (left: 1pt + rgb(colors.border)),
    width: 100%,
    inset: (x: 0.8em, y: 0.4em),
    above: 0.5em,
    below: 0em,
    strong(title),
  )
  block(
    fill: rgb(colors.body),
    stroke: (left: 1pt + rgb(colors.border)),
    width: 100%,
    inset: (x: 0.8em, y: 0.6em),
    above: 0em,
    below: 0.5em,
    body,
  )
}
