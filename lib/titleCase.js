
module.exports.toTitleCase = function(source) {
    source = source.trim();
    let words = source.split(/ +/g);
    let parts = [];
    words.forEach(w => {
        parts.push(w.substr(0, 1).toUpperCase() + w.substr(1, w.length).toLowerCase());
    });

    return parts.join(" ");
}