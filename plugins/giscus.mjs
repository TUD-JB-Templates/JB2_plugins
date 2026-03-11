/*
*  ⚠️⚠️PLEASE READ: when using this plugin for other widgets, make sure to change the name!⚠️⚠️
*/

const plugin = {
  name: 'Append anywidget to every page',
  transforms: [
    {
      name: 'add-Giscus-anywidget',
      doc: 'Adds an anywidget to the end of every page',
      stage: 'document',
      plugin: (_, utils) => (node) => {
        const anyWidgetNode = {
            type: 'block',
            children: [
                {
                type: 'anywidget',
                esm: 'https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/giscus-widget/giscus_widget.mjs',
                model: {},
                css: undefined,
                class: undefined
                }
            ]
        }
        node.children.push(anyWidgetNode);
      },
    },
  ],
};

export default plugin;