# Latex to JB 2

[from the mystmd documentation:](https://mystmd.org/guide/writing-in-latex#getting-started)

> To begin rendering LaTeX documents with MyST, first install the MyST CLI. Navigate to your project directory containing LaTeX (*.tex) files and execute the commands myst init followed by myst start. This launches a dynamic web server that renders your LaTeX content in near real-time, with comprehensive error reporting for issues such as unrecognized macros or any other math rendering problems. 

Instead of using myst start, use gh-pages for hosting the site.

## Setting up 

- Link overleaf to github. In overleaf, go to Integrations > GitHub > Create a GitHub repository

![image of overlead ](./images/image2.png)

- Open GitHub Desktop and clone the repository to your device. Go to clone repository > your repositories > {name of new repository}

(next few steps will be the same as the introduction tutorial for a [book](https://mystmd.org/guide/quickstart) and [gh-pages](https://mystmd.org/guide/deployment-github-pages))

- Open the repository folder in visual studio code (shortcut ctrl + shift + a)

- In vsc, open the terminal (shortcut ctrl + shift + `)

- run `myst init` to generate a myst.yml file

- run 'myst init --gh-pages` to generate deploy.yml file

- follow instructions in terminal 

## Updating page

- To update the gh-page from overleaf, go to Integrations > GitHub > Push Overleaf changes to GitHub > sync. This will automatically update the gh page using the deploy action.