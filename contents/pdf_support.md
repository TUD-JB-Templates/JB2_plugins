# PDF support - custom directives

## Adding plugins to your book 

This page explains how to add a variety of plugins to your book.
Each plugin can be linked individually in your myst.yml file.

⚠️ Important: Always include the CSS file (only once) to ensure the custom styles are applied.

Example myst.yml configuration:

```{code} yaml
:filename: myst.yml
site:
  template: book-theme
  options:
    style: https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/CSS/custom.css
```

## iframe 

```{iframe} https://www.youtube.com/embed/oL4-ipL62pQ?si=3G_VbzWoJ2cFF_A3
:name: vid_1

a great movei
```

Use this link to add support for iframes when converting to pdf:  

```text
https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/iframe/iframe.mjs
```

## example

```{example} Here is an example

With some text. 

```

Use this link to add support for the example directive when converting to pdf:  

```text
https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/example/example.mjs
```

## experiment

```{experiment} this is an experiment

with a description

```

Use this link to add support for the experiment directive when converting to pdf:  

```text
https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/experiment/experiment.mjs
```



## intermezzo

```{intermezzo} this is an intermezzo

with a description

```

Use this link to add support for intermezzo's when converting to pdf:  

```text
https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/intermezzo/intermezzo.mjs
```

# exercises

```{exercise} my-exercise
:label: my-exercise

1 + 1 = ... ?

```

```{solution} my-exercise
:label: my-solution

2

```

Use this link to add support for exercises when converting to pdf:  

```text
https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/exercise/pdf_exercise.mjs
```

## Custom element

To generate a custom element, including css



- style must have been included in css file.
