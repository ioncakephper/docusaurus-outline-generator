
module.exports.generate = function(topics, options) {
    if (typeof topics === 'array') {
        generateTopicFiles(topics, options);
    }
}

function generateTopicFiles(topics, options) {
    topics.forEach(topic => {
        console.log(topic);
    })
}