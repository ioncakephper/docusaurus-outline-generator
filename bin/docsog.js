const docsog = require("../lib/docusaurusOutlineGenerator");
const program = require("commander");
const fs = require("fs");
const path = require("path");

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

    });

program
   .command("generate [source]")
   .description("generate topic files in docs and navigation in sidebars.json")
   .option("-d, --docspath <path>", "path where topic files are generated")
   .action((source) => {

   })

program.parse(process.argv);

