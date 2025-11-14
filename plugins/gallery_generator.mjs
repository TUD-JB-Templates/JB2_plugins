import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const DEFAULT_FILENAME = 'myst.yml';

function readYaml(srcPath) {
  try {
    const text = readFileSync(srcPath, 'utf-8');
    return yaml.load(text);
  } catch (err) {
    console.error(`[readYaml] Failed to read or parse ${srcPath}:`, err);
    return null;
  }
}

const galleryDirective = {
  name: 'gallery-generator',
  doc: 'Reads myst.yml and injects a gallery grid into the document.',
  alias: ['gallery'],
  arg: {
    type: String,
    doc: 'Optional: file path to the YAML data file (default: myst.yml)',
  },
  options: {},
  run(_data) {
     // Determine YAML path (argument overrides default)
    const filename = _data.arg && _data.arg.trim() !== '' ? _data.arg : DEFAULT_FILENAME;
    // Load the YAML data
    const yamlPath = path.resolve(process.cwd(), filename);
    const data = readYaml(yamlPath) ?? {};
    const books = data.books || [];

    // Build the AST node
    const result_node = {
      type: 'block',
      children: [
        {
          type: 'grid',
          columns: [1, 1, 2, 2],            // 2 COLUMNS 
          children: books.map(book => ({
            type: 'card',
            url: book.website,
            children: [
              {
                type: 'header',
                children: [{ type: 'text', value: book.name }],
              },
              {
                type: 'paragraph',
                children: [
                  { type: 'image', url: book.image, alt: book.name },
                  { type: 'text', value: book.description }
                ],
              },
            ],
          })),
        },
      ],
    };

    // A directive's run() must return an array of nodes
    return [result_node];
  },
};

const plugin = {
  name: 'Gallery Generator Plugin',
  directives: [galleryDirective],
};

export default plugin;
