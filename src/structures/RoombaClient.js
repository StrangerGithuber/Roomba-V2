const mongoose = require("mongoose");
const { AkairoClient, CommandHandler, ListenerHandler } = require("discord-akairo");
const { embed } = require("../util/functions");
const { CLIENT_TOKEN, MONGO_STRING } = require('../util/config');
const { color } = require("../util/colors");
const ts = new Date();

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
    }

    init() {
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        console.log("════════════════════════════════════════════");
        console.log(`═══════════ ${this.commandHandler.modules.size} Loaded Commands ══════════════`);
        console.log("════════════════════════════════════════════");
        this.commandHandler.categories.forEach((val) => {
            console.log(`▶ ${val} Category :`);
            val.forEach(r => {
                console.log(`\t⬤ ${r.id}`)
            })
        })
        this.listenerHandler.loadAll();
        console.log("════════════════════════════════════════════");
        console.log(`═══════════ ${this.listenerHandler.modules.size} Loaded Listeners ═════════════`);
        console.log("════════════════════════════════════════════");
        this.listenerHandler.categories.forEach(val => {
            val.forEach(r => {
                console.log("▶ " + r.id);
            })
        })
        console.log("════════════════════════════════════════════");
    }

    async start() {
        console.clear();
        try{
            await mongoose.connect(MONGO_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("════════════════════════════════════════════");
            console.log(" " + ts.toLocaleString() + " - Database Connected");
        }catch (e) {
            console.log("Database not connected !\n\n Error : \n" + e);
            return process.exit();
        }

        await this.init();
        return this.login(CLIENT_TOKEN)
    }
}