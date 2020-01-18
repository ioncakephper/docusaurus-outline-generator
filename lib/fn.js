const path = require("path");

module.exports.slug = function(source) {
    source = source.replace(/[~`!#@$%^&*()_\-\+\=\{\[\}\]\|\\:;\"\'\<\,\>\.\?\/]+\b/, "").trim();
    source = source.replace(/\b[~`!#@$%^&*()_\-\+\=\{\[\}\]\|\\:;\"\'\<\,\>\.\?\/]+/, "").trim();
    return source.trim().toLowerCase().replace(/[ ~`!#@$%^&*()_\-\+\=\{\[\}\]\|\\:;\"\'\<\,\>\.\?\/]+/g, "-");
}

module.exports.setMissingExtension = function(basename, extension) {
    let ext = path.extname(basename);
    if (ext.length == 0) {
        return basename.trim() + extension.trim();
    }
    return basename.trim();
}