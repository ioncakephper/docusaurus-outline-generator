<!-- omit in toc -->
# docusaurus-outline-generator

Generate topic files and navigation structure for Docusaurus. It generates `Markdown` files and `sidebars.json` file from an outline object.

- [Installation](#installation)
- [Usage](#usage)
- [CLI Commands](#cli-commands)
  - [`init` CLI sub-command](#init-cli-sub-command)
  - [`generate` CLI sub-command](#generate-cli-sub-command)
- [Generating Docusaurus Documentation with `docsog`](#generating-docusaurus-documentation-with-docsog)
  - [Prerequisites](#prerequisites)
  - [Using `docsog` to generate documentation](#using-docsog-to-generate-documentation)

## Installation

Install `docusaurus-outline-generator` globally:

```bash
npm install docusaurus-outline-generator -g
```

After installing it globally, the `docsog` command is available.

## Usage

In your scripts:

```javascript

const docsog = require("docusaurus-outline-generator")

// create outline object
let docProj = {
    "project": "Sample documentation title",
    "topics": [
        {
            "title": "Getting started",
            "slug": "doc1", // as first topic, use this slug
            "topics": [
                "Installation",
                "Usage",
                {
                    "title": "Topic with children",
                    "topics": [
                        "Child topic #1",
                        "Child topic #2"
                    ],
                    // Add several headers in this topic
                    "headers": [
                        "Adding sub-topics to a topic",
                        "Sub-topics of a sub-topic"
                    ]
                }
                "Updates"
            ]
        }
    ]
}

let options = {
    "topicTitleCase": true,
    "headerTitleCase": false
}

let topics = docProj.topics;

docsog.generate(topics, options);
```

## CLI Commands

`docsog` provides two sub-commands: `init` and `generate`.

```text
Usage: docsog [options] [command]

Options:
  -V, --version                output the version number
  -h, --help                   output usage information

Commands:
  init                         initialize docusaurus outline generator
  generate [options] [source]  generate topic files in docs and navigation in sidebars.json
```

### `init` CLI sub-command

Run the `init` sub-command to initialize the folders and files the `generate` sub-command will use. Typically, you need to run `init` only once. 

```bash
docsog init
```
This command creates template files in the `templates` folder, the `docsog-config.json` and `docsog-outline.json` files. The `docsog-config.json` contains configuration information, and the `docsog-outline.json` is the default outline source file. This files contains a demo outline. You can edit it with your preferred documentation outline. You can also create a different outline file and use it in `generate` sub-command.

### `generate` CLI sub-command

Options for `generate` sub-command:

```txt
Usage: generate [options] [source]

generate topic files in docs and navigation in sidebars.json

Options:
  -d, --docspath <path>       path where documentation documents will be generated (default: "./docs")
  -t, --templatespath <path>  path to templates used during generation (default: "./templates")
  -w, --websitepath <path>    path where sidebars.json will be generated (default: "./website")
  -c, --config <file>         filename or full path to generation configuration file (default: "docsog-config.json")
  -h, --help                  output usage information
```

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
