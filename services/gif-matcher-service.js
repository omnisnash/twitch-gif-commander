const config = require('./../config.json');

const isWaiting = false

function match(rawValue) {
    if (!rawValue) { return null};

    const value = rawValue.trim().toLowerCase();
    const parts = value.toLowerCase().split(" ");
    
    const matching = config.contents.find(content => content.triggerOn.some(trigger => parts.includes(trigger)));


    if (matching) {
        console.log(" Received a Match : " + JSON.stringify(matching, 9, 1) );
    } else {
        console.log(" Received a No Matching ");
    }
    
    return matching ? matching : null;
}

module.exports = match;