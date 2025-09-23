/* Custom experiment admonition, based on documentation (see https://next.jupyterbook.org/plugins/directives-and-roles#create-a-custom-admonition). 
*   css file (custom.css) included in style folder. 
*/

import { generateTypstNode, generateTypstElement, getAdmonitionColors } from "./typstAdmonitions/generate_admonition.mjs";

const experimentStyle = getAdmonitionColors("style/custom.css", "experiment");

let getText = (node) => {
  if(node.type === "text") return node.value;
  if(node.children) return node.children.map(getText).join("");
  return "";
}

const experiment = {
  name: "experiment",
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
      "class": "admonition-experiment",  //Add class (custom.css)
      "icon": false,
      "children": [
        
        {
          "type": "admonitionTitle",
          "class": "admonition-title-experiment",
          "children": ctx.parseMyst(`${title}`)["children"][0]["children"]
        },
        
        {
          "type": "paragraph",
          "class": "admonition-body-experiment", //add 'fake' class, for later use and for selecting in transform
          "children": ctx.parseMyst(body)["children"] 
        }
      ]
    }

    return [admonition];
  }
};

const experimentTransform = {
  name: "conditional-experiment",
  doc: "Replace custom experiment admonitions in PDF builds.",
  stage: "document",
  plugin: (opts, utils) => (tree) => {
    
    // Detect if we are building a PDF using typst, using latex the directive only is enough
    const isPDF = process.argv.some(arg => arg.includes("typst"));

    //Exit if not
    if(!isPDF) return;

    // As we defined the node ourselves, we can search for it
    const experiments = utils.selectAll('admonition[class~="admonition-experiment"]', tree);

    experiments.forEach((node) => {

      // Get title and body
      const titleNode = utils.select('admonitionTitle[class~="admonition-title-experiment"]', node);
      const bodyNode = utils.select('paragraph[class~="admonition-body-experiment"]', node); 

      const title = getText(titleNode);
      const body = getText(bodyNode);

      // Replace the *contents* of the node in place, somehow foreach does not work... some copy problem
      Object.assign(node, generateTypstNode(
        generateTypstElement(
          "experiment",
          experimentStyle.border,
          experimentStyle.header,
          experimentStyle.body,
          title,
          body
        )
      ));
    });    
    
  }
};

const plugin = {
  name: "experiment",
  directives: [experiment],
  transforms: [experimentTransform],
};

export default plugin;

