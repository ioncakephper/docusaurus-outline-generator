# docusaurus-outline-generator

Generate topic files and navigation structure for Docusaurus. It generates `Markdown` files and `sidebars.json` file from an outline object.

## Installation

Install `docusaurus-outline-generator` globally:

```bash
npm install docusaurus-outline-generator -g
```

After installing it globally, the `docsog` command is available.

## Generating Docusaurus Documentation with `docsog`

### Prerequisites

1. `Docusaurus` installed globally

### Using `docsog` to generate documentation

1. Create a documentation folder

```bash
mkdir documentation
chdir documentation
```

2. Initialize `docusaurus`

```bash
docusaurus-init
```

3. Initialize `docsog`

```bash
docsog init
```

This creates the  `topic.handlebars` aad `header.handlebars` in the `templates` folder, and `docsog-config.json` and `docsog-outline.json`, which is a startup outline document. In this
example, you will make no changes to this outline file. You can however, edit it to create your own 
outline, or create another outline file.

4. Generate documentation based on outline file.

```bash
docsog generate
```

This will generate documentation files in `.docs` folder and will overide the `website/sidebars.json` file. `sidebars.json` contains the documentation navigation structure (see [Navigation](https://docusaurus.io/docs/navigation)).

5. View generated documentation outline

You will change to `website` folder and start the docusaurus preview server -- details at [Docusaurus](https://docusaurus.io/docs).

```bash
cd website
npm start
```

The browser will open at `http://localhost:3000`. Click `Docs` in the top navigation bar to see the documentation.
