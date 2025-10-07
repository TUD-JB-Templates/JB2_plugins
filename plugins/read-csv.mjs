// See issue https://github.com/jupyter-book/mystmd/issues/1616?utm_source=chatgpt.com
// with code https://github.com/jupyter-book/myst-enhancement-proposals/blob/main/mep.mjs

// TODO: als dit een plugin wordt, gebruik esbuild voor alle packages die gebruikt worden

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'csv-parse/sync';
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

        // get filename in a general way, so it does not matter if it is / or \ in the path
        const pathParts = relativePath.split(/[/\\]/);
        const filename = pathParts[pathParts.length - 1];

        // parse frontmatter manually from the source file. console log statement for debugging
        console.log(`[CSV] Checking frontmatter in: ${relativePath} for ${filename}`);
        const fm = getFrontmatter(file.path);
        
        if (!fm || !fm.csv_name) return node;

        // log frontmatter for debugging
        console.log('csv found: ',fm);

        // resolve CSV path
 
        // Exit if CSV path does not exist, check using existsSync
        if (!existsSync(fm.csv_name)) {
            console.warn(`CSV file NOT found: ${fm.csv_name}`);
            return node;
        }

        // read CSV contents
        const csvContent = readFileSync(fm.csv_name, 'utf-8');

        // parse CSV into array of objects
        const records = parse(csvContent, {
            columns: true,   // first row as headers
            skip_empty_lines: true
        });

        // log first row for debugging
        console.log('First row of CSV:', records[0]);

        let date = ""

        for (const record of records) {
          if (record.Name === filename) {
            console.log(`Found matching record for ${filename}: Last Edited = ${record['Last Edited']}`);
            date = record['Last Edited'];
          }
        }


        // prepend to node, "found CSV file at ..."
        node.children.unshift({
            type: 'div',
            class: 'font-light text-sm',
            children: [{
                type: 'text',
                value: `Updated: ${date}`
            }]
        });

        return node;
    };
  },
};

const plugin = {
  name: 'CSV Notice Plugin',
  transforms: [csvNoticeTransform],
};

export default plugin;
