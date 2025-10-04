// See issue https://github.com/jupyter-book/mystmd/issues/1616?utm_source=chatgpt.com
// with code https://github.com/jupyter-book/myst-enhancement-proposals/blob/main/mep.mjs

// TODO: als dit een plugin wordt, gebruik esbuild voor alle packages die gebruikt worden

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import yaml from 'js-yaml';

// helper: parse frontmatter from a Markdown file
function getFrontmatter(srcPath) {
  try {
    const text = readFileSync(srcPath, 'utf-8');
    const match = /^---\s*([\s\S]*?)---/.exec(text);
    if (!match) return null;
    return yaml.load(match[1]);
  } catch (err) {
    return null;
  }
}

const csvNoticeTransform = {
  name: 'csv-notice',
  doc: 'If frontmatter contains Datum_id, check CSV exists and log path',
  stage: 'document',
  plugin: (_opts, utils) => {
    return (node, file) => {
      if (!file.path) return node;

        // remove working directory from vfile
        const relativePath = file.path.replace(process.cwd(), '');

        // parse frontmatter manually from the source file. console log statement for debugging
        console.log(`[date] Checking frontmatter in: ${relativePath}`);
        const fm = getFrontmatter(file.path);

        //Check if updated exists in frontmatter, if so add date to top of document
        if (fm?.updated) {
            // log frontmatter for debugging
        console.log('Date found: ',fm.updated);

        node.children.unshift({
            type: 'div',
            class: 'font-light text-sm mb-4',
            children: [{
                type: 'text',
                value: `Updated: ${fm.updated}`
            }]
        });
        } else {
            node.children.unshift({
                type: 'div',
                class: 'font-light text-sm mb-4',
                children: []
            });
        };

        

        return node;
    };
  },
};

const plugin = {
  name: 'CSV Notice Plugin',
  transforms: [csvNoticeTransform],
};

export default plugin;
