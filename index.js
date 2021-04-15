// Retrieve internal services and dependencies from npm
const WebsocketService = require('./services/websocket-service');
const TwitchService = require('./services/twitch-service');
const express = require('express');
const messageMatchGif = require('./services/gif-matcher-service')

console.log("# Twitch GIF Commander\n")

// Retrieve JSON configuraiton file
// TODO: create a function to validate file exists + content
const config = require('./config.json');
validateConf();

// If you change the port, be sure to edit the /public/script.js too 
const port = 4242;

const app = express();
const server = app.listen(port);
app.use(express.static(__dirname + '/public'));
console.log("→ HTTP server started on: http://localhost:" + port);

const websocketService = new WebsocketService()
websocketService.start(server)
console.log("→ Websocket server started on: ws://localhost:" + port);

const twitchService = new TwitchService(onTwitchMessage);
twitchService.start(config.twitch.botUsername, config.twitch.oauthToken, config.twitch.channelName);
console.log("→ Track chat from: https://twitch.tv/" + config.twitch.channelName);

function onTwitchMessage(message) {
    const match = messageMatchGif(message);

    if (match) {
        websocketService.sendMessage(match)

        // Reset the timmer if the non-default gif is displayed
        if (this.timmer) {
            clearTimeout(this.timmer);
        }

        // Reset the default fid after a after `config.resetAfter` ms
        this.timmer = setTimeout(() => {
            websocketService.sendMessage("default")
            this.timmer = null;
        }, config.resetAfter);
    }
}

function validateConf() {
    // TODO
}