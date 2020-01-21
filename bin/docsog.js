#!/usr/bin/env node

const docsog = require("../lib/docusaurusOutlineGenerator");
const program = require("commander");
const fs = require("fs");
const path = require("path");
const fn = require("../lib/fn");

program
  .command("init")
  .description("Initialize Docusaurus Outline Generator")
  .action(() => {
      let options = docsog.defaultOptions;
      let flds = [options.docsPath, options.templatesPath, options.websitePath];
      flds.forEach(f => {
      if (!fs.existsSync(f))
          fs.mkdirSync(f);
      });

      // default configuration
      fs.writeFileSync("docsog-config.json", JSON.stringify(options, null, 4), "utf8");

      let outline = {
        "project": "Sample documentation outline",
        "topics": [
          {
            "title": "Getting started",
            "slug": "doc1",
            "headers": [
              "Installation",
              "Quick Demo",
              {
                "title": "CLI Command",
                "headers": [
                  "docsog init",
                  "docsog generate"
                ]
              }
            ],
            "brief": "You can change the slug for this page, and then change the headerLinks in siteConfig.js",
            "topics": [
              "Outline JSON properties",
              "Writing your first documentation"
            ]
          },
          {
            "title": "Guides",
            "brief": "Topics in this section are specified as simple strings",
            "topics": [
              "Building new features",
              "Standard new applications"
            ]
          }
        ]
      }
      fs.writeFileSync("docsog-outline.json", JSON.stringify(outline, null, 4), "utf8");

      // copy original templates file into
      let templatesPath = path.resolve(__dirname, "..", "lib", "templates");
      fs.copyFileSync(path.join(templatesPath, "topic.handlebars"), path.join(options.templatesPath, "topic.handlebars"));
      fs.copyFileSync(path.join(templatesPath, "header.handlebars"), path.join(options.templatesPath, "header.handlebars"));

    });

let defaultOptions = docsog.defaultOptions;

program
   .command("generate [source]")
   .description("generate topic files in docs and navigation in sidebars.json")
   .option("-d, --docspath <path>", "path where documentation documents will be generated", defaultOptions.docsPath)
   .option("-t, --templatespath <path>", "path to templates used during generation", defaultOptions.templatesPath)
   .option("-w, --websitepath <path>", "path where sidebars.json will be generated", defaultOptions.websitePath)
   .option("-c, --config <file>", "filename or full path to generation configuration file", "docsog-config.json")
   .action((source, cmdObj) => {

      let configFilename = fn.setMissingExtension(cmdObj.config, ".json");
      let configSource = fs.readFileSync(configFilename, "utf8")
      let options = JSON.parse(configSource);

      options.docsPath = cmdObj.docspath;
      options.templatesPath = cmdObj.templatespath;
      options.websitePath = cmdObj.websitepath;

      if (!source) {
        source = "docsog-outline.json";
      }
      let outlineSource = fs.readFileSync(fn.setMissingExtension(source, ".json"), "utf8");
      let outline = JSON.parse(outlineSource);
      

      docsog.generate(outline.topics, options);
   })
   

program.parse(process.argv);

