# JB2_plugins
Plugins for JB2


## Test procedure
- Include the plugin in this MysT book
- Make use of the plugin (e.g. call the admonition)
- Local test build book (myst start)
- Local test build pdf  (myst build --pdf)

## plugins available 

| plugin | description | release link |
| -------- | -------- | -------- |
| example  | adds example support to PDF conversion  | https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/example/example.mjs  |
| experiment  | adds experiment support to PDF conversion  | https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/example/example.mjs  |
| iframe  | Turns iframes into QR codes during PDF conversion  | https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/iframe/iframe.mjs  |
| intermezzo  | adds intermezzo support to PDF conversion  | https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/intermezzo/intermezzo.mjs  |
| exercise  | adds exercise support to PDF conversion  | https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/exercise/exercise.mjs  |



## adding plugins to project

Add following to myst.yml file: 

```{code} yaml
:filename: myst.yml
project:
  plugins:
    - https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/example/example.mjs
```

CSS file needed for rendering the plugin admonitons. The CSS file can be included as 

```{code} yaml
:filename: myst.yml
site:
  template: book-theme
  options:
    style: https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/CSS/custom.css
```

