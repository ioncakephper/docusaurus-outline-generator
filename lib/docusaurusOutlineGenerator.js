const fn = require("./fn");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const tc = require("./tc");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

module.exports.defaultOptions = {
    "docsPath": "./docs",
    "templatesPath": "./templates",
    "websitePath": "./website",
    "markdownExtension": ".md",
    "templateExtension": ".handlebars",
    "jsonExtension": ".json",
    "topicTitleCase": true,
    "headerTitleCase": true
}

module.exports.generate = function (topics, options) {

    topics = normalizeTopics(topics);
    generateTopicFiles(topics, options);
    generateSidebarsFile(topics, options);
}

function normalizeTopics(anyTopics) {
    let topics = [];
    anyTopics.forEach(t => {
        if (typeof t === 'string') {
            t = {"title": t};
        }
        if (t.topics) {
            t.topics = normalizeTopics(t.topics);
        }
        if (t.headers) {
            t.headers = normalizeHeaders(t.headers);
        }
        if (!t.brief) {
            t.brief = lorem.generateParagraphs(1);
        }
        topics.push(t);
    });
    return topics;
}
                      
function normalizeHeaders(anyHeaders) {
    let headers = [];
    anyHeaders.forEach(h => {
        if (typeof h === 'string') {
            h = {"title": h};
        }
        if (h.headers) {
            h.headers = normalizeHeaders(h.headers);
        }
        headers.push(h);
    });
    return headers;
}

function generateSubLevelCategories(topics, options) {
    let docs = [];
    topics.forEach(topic => {
        if (topic.topics) {
            let item = {
                "type": "subcategory",
                "label": topic.title,
                "ids": [getTopicBasename(topic, options)]
            };
            let children = generateSubLevelCategories(topic.topics, options);
            children.forEach(c => {
                item.ids.push(c);
            })
            docs.push(item);
        } else {
            docs.push(getTopicBasename(topic, options));
        }
    })
    return docs;
}

function generateTopLevelCategories(topics, options) {
    let docs = {};
    topics.forEach(topic => {
        if (topic.topics) {
            let items = [];
            items.push(getTopicBasename(topic, options));
            let children = generateSubLevelCategories(topic.topics, options);
            children.forEach(c => {
                items.push(c);
            })
            docs[topic.title] = items;
        }
    })
    return docs;
}

function generateSidebarsFile(topics, options) {

    let sidebar = {
        "docs": {
        }
    };

    sidebar.docs = generateTopLevelCategories(topics, options);

    let result = JSON.stringify(sidebar, null, 4);
    let sidebarsBasename = "sidebars";
    saveJsonFile(sidebarsBasename, result, options);
}

function saveJsonFile(sidebarsBasename, content, options) {
    sidebarsBasename = fn.setMissingExtension(sidebarsBasename, options.jsonExtension);
    sidebarsBasename = [options.websitePath, sidebarsBasename].join(path.sep);

    fs.writeFileSync(sidebarsBasename, content, "utf8");
}

function getTopicBasename(topic, options) {
    let source = (topic.slug) ? topic.slug : (topic.short) ? topic.short : topic.title;
    return fn.slug(source.trim());
}

function getTopicFilename(topic, options) {
    return fn.setMissingExtension(getTopicBasename(topic, options), options.markdownExtension);
}

function generateTopicFiles(topics, options) {
    topics.forEach(topic => {
        let result = generateFromTemplate("topic", getTopicTemplateData(topic, options), options);
        saveMarkdownFile(getTopicFilename(topic, options), result, options);
        if (topic.topics) {
            generateTopicFiles(topic.topics, options)
        }
    })
}

function generateTopicHeaders(headers, level, options) {
    let content = "";
    headers.forEach(header => {
        let data = {
            "prefix": "#".repeat(level),
            "title": (options.headerTitleCase) ? tc.toTitleCase(header.title).trim() : header.title.trim().replace(/ +/g, " ")
        }
        if (header.brief) {
            data.brief = header.brief;
        }
        if (header.headers) {
            data.content = generateTopicHeaders(topic.headers, level + 1, options);
        }
        content += generateFromTemplate("header", data, options);
    })

    return content;
}

function getTopicTemplateData(topic, options) {
    let data = {};
    data.title = (options.topicTitleCase) ? tc.toTitleCase(topic.title.trim()) : topic.title.trim().replace(/ +/g, " ");
    data.slug = getTopicBasename(topic, options);
    if (topic.headers) {
        data.content = generateTopicHeaders(topic.headers, 2, options);
    }
    if (topic.brief)
        data.brief = topic.brief.trim();

    return data;
}

function generateFromTemplate(templateBasename, data, options) {
    templateBasename = fn.setMissingExtension(templateBasename, options.templateExtension);
    templateBasename = [options.templatesPath, templateBasename].join(path.sep);
    
    let source = fs.readFileSync(templateBasename, "utf8");
    let template = Handlebars.compile(source);

    return template(data);
}

function saveMarkdownFile(markdownBasename, content, options) {
    markdownBasename = fn.setMissingExtension(markdownBasename, options.markdownExtension);
    markdownBasename = [options.docsPath, markdownBasename].join(path.sep);

    fs.writeFileSync(markdownBasename, content, "utf8");
}
