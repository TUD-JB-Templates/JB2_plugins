/* Custom example admonition, based on documentation (see https://next.jupyterbook.org/plugins/directives-and-roles#create-a-custom-admonition). 
*   css file (custom.css) included in style folder. 
*/

import { generateTypstNode, generateTypstElement, getAdmonitionColors } from "./typstAdmonitions/generate_admonition.mjs";

const exampleStyle = getAdmonitionColors("style/custom.css", "example");

let getText = (node) => {
  if(node.type === "text") return node.value;
  if(node.children) return node.children.map(getText).join("");
  return "";
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
    
    let title = data.arg.trim();
    let body = data.body.trim();

    const admonition = {
      "type": "admonition",
      "kind": "note",
      "class": "admonition-example",  //Add class (custom.css)
      "icon": false,
      "children": [
        
        {
          "type": "admonitionTitle",
          "class": "admonition-title-example",
          "children": ctx.parseMyst(`${title}`)["children"][0]["children"]
        },
        
        {
          "type": "paragraph",
          "class": "admonition-body-example", //add 'fake' class, for later use and for selecting in transform
          "children": ctx.parseMyst(body)["children"] 
        }
      ]
    }

    return [admonition];
  }
};

const exampleTransform = {
  name: "conditional-example",
  doc: "Replace custom example admonitions in PDF builds.",
  stage: "document",
  plugin: (opts, utils) => (tree) => {
    
    // Detect if we are building a PDF using typst, using latex the directive only is enough
    const isPDF = process.argv.some(arg => arg.includes("typst"));

    //Exit if not
    if(!isPDF) return;

    // As we defined the node ourselves, we can search for it
    const examples = utils.selectAll('admonition[class~="admonition-example"]', tree);

    examples.forEach((node) => {

      // Get title and body
      const titleNode = utils.select('admonitionTitle[class~="admonition-title-example"]', node);
      const bodyNode = utils.select('paragraph[class~="admonition-body-example"]', node); 

      const title = getText(titleNode);
      const body = getText(bodyNode);

      // Replace the *contents* of the node in place, somehow foreach does not work... some copy problem
      Object.assign(node, generateTypstNode(
        generateTypstElement(
          "example",
          exampleStyle.border,
          exampleStyle.header,
          exampleStyle.body,
          title,
          body
        )
      ));
    });    
    
  }
};

const plugin = {
  name: "example-plugin",
  directives: [example],
  transforms: [exampleTransform],
};

export default plugin;

