# Gallery grid

This plugin generates a responsive card-based gallery grid using data loaded from a YAML file.
Each item in the YAML file becomes a card containing a title, image, description, and a link.

Use the directive in your Markdown, which will load data from `filename.yml`:
```markdown
:::{gallery-generator} filename.yml
:::
```
If no filename is provided, it will default to `myst.yml`. 
The YAML file should define a list of items to appear in the grid:

```yaml
books: 
- name: Jupyter Book 2 Workshop Template
  website: https://jupyter-book.github.io/workshop-template/
  repository: https://github.com/jupyter-book/workshop-template
  image: https://jupyterbook.org/stable/build/config-item-9ec68b1d-f72dcf20e0e079cdebe5dc9e5fbd7418.svg
  description: A GitHub Template repository designed for use in Jupyter Book 2 and MyST workshops.
```
Example:

:::{gallery-generator} gallery.yml
:::