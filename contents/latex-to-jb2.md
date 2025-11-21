# Using Jupyter Book with Overleaf, Visual Studio Code and GitHub Pages

This guide walks you through connecting an Overleaf LaTeX project to GitHub and transforming it into a Jupyter Book–style site using MyST. It explains how to initialize the project, set up GitHub Pages deployment, and manage updates directly from Overleaf. With this workflow, your LaTeX documents are continuously published as a live, web-hosted site.

Prerequisites: 
- A GitHub account
- An Overleaf account
- An existing Overleaf project
- Git or Github Desktop installed
- VS code installed
- Node.js available 

## Setting up

The steps below guide you through configuring your local environment, linking Overleaf to GitHub, and preparing the repository so it can be built and published with MyST and GitHub Pages.

### Overleaf

1) Open your Overleaf project.
2) Go to Menu > Integrations > GitHub.
![image of overlead ](./images/image2.png)
3) Select `Create GitHub Repository`. Overleaf will generate a new repository and link your project to it. 

You now have a GitHub repo containing your LaTeX files, ready to clone to your local machine. 

### Local machine

1) Open GitHub Desktop or use Git to clone the newly created repository to your computer. 
2) If using GitHub Desktop, go to Clone repository > your repositories > {name of new repository}. 
3) Open the cloned folder in Visual Studio Code.
4) Open the integrated terminal.

:::{tip}
The next few steps will be similar to the [Jupyter Book documentation](https://jupyterbook.org/stable/get-started/), which you can refer to for more details about the process. 
:::

5) Install Jupyter Book
```shell
pip install "jupyter-book>=2.0.0a0"
```
6) Run the `init` command to ininitialise a `myst` project in the current directory. Do not run the `start` command (Jupyter Book will ask). 
```shell
jupyter book init
```
7) Run the `init --gh-pages` to setup a GitHub Action
```shell
jupyter book init --gh-pages
``` 

8) Commit and push all generated files to GitHub using Git or GitHub desktop. 

This completes the one-time setup on your local machines, and future updates from Overlead or your local machine will now trigger automatic site builds on GitHub Pages. 


### GitHub

The last step in the setup process is to give GitHub Actions permission to publish your site to GitHub Pages. In your repository settings, go to Settings > Pages, set the Source to “GitHub Actions,” and save. Once enabled, every time you push to the repository, the action created earlier will automatically build and publish your Jupyter Book to the live site.

## Usage

### Changes using Overleaf

After making changes to your projects in Overleaf, push the changes to GitHub by going to Integrations > GitHub > Push Overleaf changes to GitHub > sync. The gh-action will now rebuild your book, and update the website accordingly. 

### Changes using VS code



:::{exercise}
Try adding a Python plot of your data to your overleaf project.
:::

- To update the gh-page from overleaf, go to Integrations > GitHub > Push Overleaf changes to GitHub > sync. This will automatically update the gh page using the deploy action.

## Additional reading

- [Jupyter Book Documentation](https://jupyterbook.org/stable/) \
A guide to creating structured, book-style documentation using Markdown, MyST, and Sphinx. Covers project initialization, configuration, file organization, and local builds.

- [GitHub Pages](https://pages.github.com/) \
GitHub’s built-in hosting service that publishes static websites directly from your repository. 

- [GitHub Actions](https://github.com/features/actions) \
A workflow automation system that runs tasks, like building your Jupyter Book—whenever you push to the repository.

- [Overleaf Integrations](https://docs.overleaf.com/integrations-and-add-ons/integrations-and-add-ons) \
Overleaf’s built-in tools for linking your LaTeX projects to other services.


[from the mystmd documentation:](https://mystmd.org/guide/writing-in-latex#getting-started)
  

