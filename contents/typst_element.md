# New typst element

## define element

Create new file, aside_style.typ in this example

```typ
// Custom typst element (https://typst.app/docs/reference/)

#let aside(title, body) = { 

    // Title block
    block(
        // Outer block styled like a note block
        fill: rgb(244, 147, 147), // background - VS code automatically changes this to rgba sometimes which does not work.
        stroke: (left: 1pt + red),  // red line on the left 
        width: 100%,

        // add padding top and bottom
        inset: (x: 0.8em, y: 0.4em),
        above: 0.5em,               //distance top to next element above
        below: 0em,                 //distance bottom to next element below                

        strong(title)
    )
    block(
        // Inner block for the body of the aside
        fill: rgb(240, 240, 240),        // white background
        stroke: (left: 1pt + red),
        width: 100%,

        // add padding top and bottom
        inset: (x: 0.8em, y: 0.6em),
        above: 0em,
        below: 0.5em,

        body
    )
}

```

the content of the element follows the same style as a noteBlock. 

## Add new .typ file to template.yml 

```yml
files:
  - template.typ
  - style.typ
  - aside_style.typ
  - LICENSE
  - Cover.PNG
```

## add element via plugin

As we wanted to replace the aside element via a plugin, we inject the raw typst: 

```javascript
    rootChildren[i] = generateTypstNode(
        '#import "aside_style.typ": aside \n #aside("' + title + '", "' + body.map(b => getText(b)).join("\n") + '")'
    );
```

Make sure to include the new file as well, before naming the element.