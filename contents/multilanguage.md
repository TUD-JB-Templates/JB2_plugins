# Deploy Multi-Language MyST Books

A GitHub action can be used to automate building and deploying multiple book versions (e.g. English and Dutch) to GitHub Pages. It's designed for repositories where each language has its own content folder, for example `content/en/` and `content/nl/`. 

When you push to the main branch, this workflow: 

1) Builds each language version separatly.
2) Places each build under its respective folder (e.g. `/en/`, `/nl/`).
3) Optionally redirects the site root (`/`) to a primary language (default: English).
4) Deploys the final site to GitHub Pages. 

This workflow is compatible with any multilingual setup. You can add or duplicate language-specific build steps (like the English and Dutch examples) for more languages. 

## Overview of Repository Structure 

Your repository should include langage-specific content directiories, such as: 

```text
content/
  ├──en
  │   ├── index.md
  │   └── ...
  ├── nl
  │   ├── index.md
  │   └── ...
  ├── toc_en.yml
  ├── toc_nl.yml
  └── myst.yml

```

Each language version should have its own table of contents file (`toc_en.yml`, `toc_nl.yml`) located in the root of the project. The GitHub action will replace the toc file for each language during the build process. 

## Usage

1) create the workflow file `.github/workflows/deploy-multilang.yml`.
2) Copy the GitHub Action YAMl (TODO: Link).
3) add a frontpage to your book, containing [buttons](https://mystmd.org/guide/dropdowns-cards-and-tabs#buttons) referencing the different languages.

An example has been implemented [here](https://natuurkunde.github.io/Broekzakdemos/)

:::{tip}
you can customize the language list or behavior by editing the "prepare build folders", "Build" sections, and the "Root behavior" logic. 
:::

## Workflow breakdown 

Checkout and setup: 
- Checks out the repository using `actions/checkout@v4`.
- Sets up Node.js using `actions/setup-node@v4`.
- Installs dependencies with `npm install -g mystmd js-yaml yq`.

Building each language: 
- Each language build modigies `myst.yml` with the appropriate configuration. 
- Runs `myst build --html --ci`.
- Copies the resulting files into `_build/<language>`.

Organizing output: 
- After both builds, files are collected under `site/`:

```text
site/
  ├──en/
  ├── nl/
  └── index.html (redirect or root behavior file)
```

Root behavior:
- Based on `BEHAVIOR_PRIMARY`, the workflow determines how to handle the root folder (`/`):
    - redirect creates HTML redirect
    - copy copies `/en/` to `/`
    - move moves `/en/` to `/` and removes `/en/` 

Deployment:
- Uploads the built site using `actions/upload-pages-artifact@v3`. 
- Deploys it to GitHub pages using `actions/deploy-pages@v4`. 
