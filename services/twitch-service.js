const tmi = require('tmi.js');
const config = require('./../config.json');

class TwitchService {

    constructor(onMessage) {
        this.onMessage = onMessage;
    }

    start = (username, password, channel) => {
        const opts = {
            identity: {
              username: username,
              password: password
            },
            channels: [
                channel
            ]
          };

        const client = new tmi.client(opts);

        const onMessageHandler = (target, context, msg, self) => {
            if (self) { return; } // Ignore messages from the bot

            this._isWaiting = true;
            this.onMessage(msg.trim());

        }

        client.on('message', onMessageHandler);
        client.connect();
    }
}

module.exports = TwitchService;