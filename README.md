# Twitch GIF Commander

Display a GIF in a browser (to be captured with OBS), which change regarding Twitch chat messages content.

Quick project developped for @[TheDrakakis](https://github.com/TheDrakakis), feel free to reuse.

![preview](./doc/preview.gif)

## Installation

````
npm install
````

## Configuration

- Place your GIFs in the `./public/gif` folder
- Be sure to have a `default.gif`, which will be displayed by default

Then, create a `config.json` file at the project root level with the following content:

````json
{
    "twitch": {
        "botUsername": "Twitch-GIF-Commander",
        "oauthToken": "<your_token>",
        "channelName": "roxxorrr_du_91"
    },
    "gifs": [
        {
            "triggerOn": ["feu", "johny"],
            "file": "allumer_feu"
        },
        {
            "triggerOn": ["sad", "snif"],
            "file": "sad"
        }
    ],
    "resetAfter": 5000,
}
````

**Twitch configuration**

- `botUsername` name of the bot
- `oauthToken` authentication token from https://twitchapps.com/tmi/
- `channelName` channel chat to watch

**Gif configuration**

- `triggerOn` keywords which trigger the GIF change
- `file` the GIF filename to display, without the extension

**Other configuration**

- `resetAfter` (in ms) time before reverting the displayed gif to `default.gif`

## Run

````
npm start
````

Start a web server on http://localhost:4242 with gif