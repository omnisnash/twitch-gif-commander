const config = require('./../config.json');

function match(rawValue) {
    if (!rawValue) { return null};

    const value = rawValue.trim().toLowerCase();
    const parts = value.split(" ");
    
    const matching = config.gifs.find(gif => gif.triggerOn.some(trigger => parts.includes(trigger)));

    return matching ? matching.file : null;
}

module.exports = match;