// See issue https://github.com/jupyter-book/mystmd/issues/1616?utm_source=chatgpt.com
// with code https://github.com/jupyter-book/myst-enhancement-proposals/blob/main/mep.mjs

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import yaml from 'js-yaml';
import e from 'express';

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

        // parse frontmatter manually from the source file
        console.log(`[CSV NOTICE] Checking frontmatter in: ${relativePath}`);
        const fm = getFrontmatter(file.path);

        if (!fm || !fm.Datum_id) return node;

        console.log(fm);


        // resolve CSV path (adapt if needed)
        const csvPath = resolve('data', fm.Datum_id);

        if (existsSync(csvPath)) {
            console.log(`CSV file found: ${csvPath}`);

            // prepend to node, "found CSV file at ..."
            node.children.unshift({
                type: 'paragraph',
                children: [{
                    type: 'text',
                    value: `Found CSV file at: ${csvPath}`
                }]
            });
        } else {
            console.warn(`CSV file NOT found: ${csvPath}`);
        }

        return node;
    };
  },
};

const plugin = {
  name: 'CSV Notice Plugin',
  transforms: [csvNoticeTransform],
};

export default plugin;
