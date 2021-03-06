const mongoose = require("mongoose");
const {MusicPlayer} = require("./MusicPlayer");
const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require("discord-akairo");
const { embed, musicEmbed,fetchChannel, checkMusicChannelExistence, playlistEmbed, checkUserInVoiceChannel, checkUserInSameVoiceChannelAsBot, getBotInformations, displayBotInfos, createNewMemberCard, createRemovedMemberCard, logToMusicChannel, logLoadedHandlers, createMusicChannel,
    resolve, leaveBlacklistedGuild, generateModels, clearLogs
} = require("../util/functions");
const { GuildsProvider } = require("./providers/GuildProvider");
const { ModerationProvider } = require("./providers/ModerationProvider");
const { BaseLogProvider, MusicLogProvider } = require("../logger/LogProviders");
const { color } = require("../util/colors");
const ts = new Date();
const { Collection } = require("discord.js");
const SlashCommands = require("./handler/SlashCommands");

module.exports = class RoombaClient extends AkairoClient {
    constructor(config = {}) {
        super(
            {
                ownerID: "259741670323650571"
            },
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
        prefix: async message => {
            const guildPrefix = await this.guildSettings.get(message.guild);
            if (guildPrefix) return guildPrefix.prefix;
            return process.env.PREFIX;
        },
        allowMention: true,
        defaultCooldown: 3000,
        directory: "./src/commands/"
    });
    this.listenerHandler = new ListenerHandler(this, {
        directory: './src/listeners/'
    });
    // this.client.functions.embed()
    this.functions = {
        checkMusicChannelExistence: checkMusicChannelExistence,
        checkUserInVoiceChannel: checkUserInVoiceChannel,
        checkUserInSameVoiceChannelAsBot: checkUserInSameVoiceChannelAsBot,
        clearLogs: clearLogs,
        createMusicChannel: createMusicChannel,
        createNewMemberCard: createNewMemberCard,
        createRemovedMemberCard: createRemovedMemberCard,
        displayBotInfos: displayBotInfos,
        embed: embed,
        fetchChannel: fetchChannel,
        generateModels: generateModels,
        getBotInformations: getBotInformations,
        leaveBlacklistedGuild: leaveBlacklistedGuild,
        logLoadedHandlers: logLoadedHandlers,
        logToMusicChannel: logToMusicChannel,
        musicEmbed: musicEmbed,
        playlistEmbed: playlistEmbed,
        resolve: resolve,
    }
    this.guildSettings = new GuildsProvider();
    this.moderation = new ModerationProvider();
    // Generic Logger
    this.log = {
        base: new BaseLogProvider(),
        music: new MusicLogProvider()
    }

    // Discord Music Player client
    this.musicPlayer = new MusicPlayer(this.util.client, this.guildSettings, this);
    this.slashCommandProvider = new SlashCommands(this);

    //Theme
    // TODO need to add theme to the administration that can be changed via config file
        this.colors = {
            color: color
        }
    }

    init() {
        this.inhibitorHandler = new InhibitorHandler(this, {directory: 'src/inhibitors/'});
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.listenerHandler.setEmitters({ commandHandler: this.commandHandler });
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.functions.logLoadedHandlers(this.commandHandler, this.listenerHandler, this.inhibitorHandler);
    }

    async start() {
        console.clear();
        try{
            await mongoose.connect(process.env.MONGO_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                minPoolSize : 10,
            });
            console.log("????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????");
            console.log(" " + ts.toLocaleString() + " - Database Connected");
        }catch (e) {
            console.log("Database not connected !\n\n Error : \n" + e);
            return process.exit();
        }

        await this.init();
        setInterval(async () => {
            await this.functions.clearLogs(this, false);
        }, 1800000);
        return this.login(process.env.CLIENT_TOKEN)
    }
}
