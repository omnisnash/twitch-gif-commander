# Twitch GIF Commander

Display a GIF Or MP4 (or any image / video) in a browser (to be captured with OBS), which change regarding Twitch chat messages content.

Fork from project developped for @[Omnisnash](https://github.com/omnisnash/twitch-gif-commander), feel free to reuse.

![preview]([[https://imgur.com/a/UQNQe9y]()](https://i.imgur.com/c0UgHMH.mp4))

## Installation

````
npm install
````

## Configuration

- Place your GIFs/MP4/Content in the `./public/content` folder
- Be sure to have a `default.png`, which will be displayed by default

- A image is played for Config.resetAfter MS (default 5 secondes) then go back to default.png
- A video is played only once time then go back to default.png

- A content can be display once every Config.timeBetweenMsg (default 10 secondes)

Then, create a `config.json` file at the project root level with the following content:

````json
{
    "twitch": {
        "botUsername": "Twitch-GIF-Commander",
        "oauthToken": "<your_token>",
        "channelName": "roxxorrr_du_91"
    },
    "contents": [
        {
            "triggerOn": ["cute", "phoque", "seal"],    // Word for triggering (only one word, setence won't work, part of word won't work)
            "file": "cutieseal.mp4",                    // FileName
            "type": "video/mp4"                         // Type of file : Image for png/gif ... or video/mp4 video/webm ... 
        },
        {
            "triggerOn": ["clap", "bravo", "gg", "👏" , "👏👏", "👏👏👏", "👏👏👏👏" , "👏👏👏👏👏"],
            "file": "happy-clap-clapping.gif",
            "type": "image"
        },
        {
            "triggerOn": ["quoi", "?", "kua"],
            "file": "mister-v-tu-veux-quoi-toi.gif",
            "type": "image"
        },
        {
            "triggerOn": ["salaud", "salau", "salo"],
            "file": "usul-salaud.gif",
            "type": "image"
        },
        {
            "triggerOn": ["pamoi", "pasmoi", "caché", "cacher"],
            "file": "hide.gif   ",
            "type": "image"
        }
    ],
    "defaultContent" :
        {
            "triggerOn": [], // Don't touch, won't be used
            "file": "default.png",  // If you want to update default img to gif, update index.html img too
            "type": "image"  // Don't touch, won't be used
        },
    "resetAfter": 5000,     // Time for an image to go back to default in MS (5000 = 5 Seconds)
    "timeBetweenMsg": 10000 // Time between two content displayed in MS
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
