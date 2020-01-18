
module.exports.toTitleCase = function(source) {
    let parts = [];
    let words = source.split(/ +/g);
    words.forEach(w => {
        parts.push(this.wordToTitleCase(w));
    })
    return parts.join(" ");
}

module.exports.wordToTitleCase = function(word) {
    w = word.trim();
    return w.substr(0, 1).toUpperCase() + w.substr(1, w.length).toLowerCase();
}