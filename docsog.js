const docsog = require("./lib/docusaurus-outline-generator");
const program = require("commander");

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
      
      // create config file
      let result = JSON.stringify(options);
      fs.writeSync("docsog-outline.json", result, "utf8");
      
      // create topic-handlebars
      result = "---
 id: {{{slug}}}
 title: {{{title}}}
 ---
 {{#if brief}}
 
 {{{brief}}}
 {{/if}}
 {{#if content}}
 {{{content}}}
 {{/if}}
 ";
      fs.writeSync([options.templatesPath, "topic" + options.handlebarsExtension].join(path.sep), result, "utf8");
      
      // create header-handlebars
      result = "
 
 {{{prefix}}} {{{title}}}
 {{#if brief}}
 
 {{{brief}}}
 {{/if}}
 {{#if content}}
 {{{content}}}
 {{/if}}
 ";
      fs.writeSync([options.templatesPath, "header" + options.handlebarsExtension].join(path.sep), result, "utf8");
  });
  
    // create default outline
    let proj = {
        "project": "Your documentation project title goes here",
        "topics": [
             {
                 "title": "Getting started",
                 "slug": doc1
                 "short": "Installation",
                 "topics": [
                      "First topic",
                      "Second topic",
                      "Third topic",
                      {
                        "title": "Fourth topic",
                        "brief": "A topic with several several headers, but no sub-topics",
                        "headers": [
                          "First header",
                          "Second header",
                          "Third header",
                          {
                              "title": "First Sub-header of Third header",
                              "headers": [
                                   "First Third level header goes here",
                                   "Second third level header goes here"
                              ]
                          }
                        ]
                      }
                 ]
             }
        ]
    }
