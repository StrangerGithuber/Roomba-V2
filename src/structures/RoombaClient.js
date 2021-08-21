const { AkairoClient, CommandHandler, ListenerHandler } = require("discord-akairo");
const { embed } = require("../util/functions");
const { color } = require("../util/colors");

module.exports = class RoombaClient extends AkairoClient {
    constructor(config = {}) {
        super(
            {ownerID: "259741670323650571"},
            {
                allowedMentions: {
                    parse: ['roles', 'everyone', 'users'],
                    repliedUser: true
                },
                partials: ['CHANNEL', "REACTION", "MESSAGE", "GUILD_MEMBER", "USER"],
                presence: {
                    status: "online",
                    activities: [
                        {
                            name: "master coding",
                            type: "WATCHING",
                            url: "https://www.youtube.com/channel/UCKErNWnZIOouRFgltjPWexQ"
                        }
                    ]
                },
                intents: 32767
            }
        );
    this.commandHandler = new CommandHandler(this, {
        blockClient: true,
        blockBots: true,
        prefix: config.prefix,
        allowMention: true,
        defaultCooldown: 3000,
        directory: "./src/commands/"
    });

    this.listenerHandler = new ListenerHandler(this, {
        directory: './src/listeners/'
    });

    // this.client.functions.embed()
    this.functions = {
        embed: embed
    }

    //Theme
    // TODO need to add theme to the bot that can be changed via config file
    this.colors = {
        color: color
    }
    this.commandHandler.loadAll();
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();


    }
}