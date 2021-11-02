const mongoose = require("mongoose");
const {DMPErrors} = require("discord-music-player");
const { Player } = require("discord-music-player");
const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require("discord-akairo");
const { embed, musicEmbed,fetchChannel, checkMusicChannelExistence, checkUserInVoiceChannel, checkUserInSameVoiceChannelAsBot, getBotInformations, displayBotInfos, createNewMemberCard, createRemovedMemberCard, logToMusicChannel, logLoadedHandlers, createMusicChannel } = require("../util/functions");
const { CLIENT_TOKEN, MONGO_STRING } = require('../util/config');
const { GuildsProvider } = require("./Providers");
const { color } = require("../util/colors");
const ts = new Date();

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
            return config.prefix;
        },
        allowMention: true,
        defaultCooldown: 3000,
        directory: "./src/commands/"
    });

    this.listenerHandler = new ListenerHandler(this, {
        directory: './src/listeners/'
    });

    // Discord Music Player client

    this.musicPlayer = new Player(this.util.client, {
        leaveOnEmpty: true,
        deafenOnJoin: true,
    });

    // Events for Discord Music Player Client
    this.musicPlayer.on('channelEmpty', async (queue) => {
        const guildDB = await this.guildSettings.get(queue.guild);
        await this.functions.logToMusicChannel(queue, guildDB, "Tout le monde à quitté le channel, déconnexion...", this.guildSettings, this);
    })
    this.musicPlayer.on('songAdd', async (queue, song) => {
        const guildDB = await this.guildSettings.get(queue.guild);
        if (guildDB && guildDB.musicChannel){
            const musicChannel = await fetchChannel(this, guildDB.musicChannel);
            if (musicChannel){
                musicChannel.send(`Musique ajoutée à la liste d'attente :`);
            }
        }
    })
    this.musicPlayer.on('playlistAdd', async (queue, playlist) => {
        const guildDB = await this.guildSettings.get(queue.guild);
        if (guildDB && guildDB.musicChannel){
            const musicChannel = await fetchChannel(this, guildDB.musicChannel);
            if (musicChannel){
                musicChannel.send(`Playlist ajoutée à la liste d'attente :`);
            }
        }
    })
    this.musicPlayer.on('queueEnd', async (queue) => {
        const guildDB = await this.guildSettings.get(queue.guild);
        if (guildDB && guildDB.musicChannel){
            const musicChannel = await fetchChannel(this, guildDB.musicChannel);
            if (musicChannel){
                musicChannel.send(`Fin de la file d'attente !`);
            }
        }
    })
    this.musicPlayer.on('songChanged', async (queue, song) => {
        const guildDB = await this.guildSettings.get(queue.guild);
        if (guildDB && guildDB.musicChannel){
            const musicChannel = await fetchChannel(this, guildDB.musicChannel);
            if (musicChannel){
                musicChannel.send(`Lecture de la musique : ${song.name}`);
            }
        }
    })
    this.musicPlayer.on('clientDisconnect', async (queue) => {
        const guildDB = await this.guildSettings.get(queue.guild);
        if (guildDB && guildDB.musicChannel){
            const musicChannel = await fetchChannel(this, guildDB.musicChannel);
            if (musicChannel){
                musicChannel.send(`Déconnexion forcée par commande modérateur !`);
            }
        }
    })
    this.musicPlayer.on('clientUndeafen', async (queue) => {
        const guildDB = await this.guildSettings.get(queue.guild);
        if (guildDB && guildDB.musicChannel){
            const musicChannel = await fetchChannel(this, guildDB.musicChannel);
            if (musicChannel){
                musicChannel.send(`Un modérateur m'a rendu l'audition !`);
            }
        }
    })
    this.musicPlayer.on('error', async (error, queue) => {
            const guildDB = await this.guildSettings.get(queue.guild);
            if (guildDB && guildDB.musicChannel){
                const musicChannel = await fetchChannel(this, guildDB.musicChannel);
                if (musicChannel){
                    musicChannel.send(`Une erreur est survenu : ${error}`);
                }
            }
        })
      // TODO ADD LES FONCTIONS POUR LES PLAYLISTS

    // this.client.functions.embed()
    this.functions = {
        checkMusicChannelExistence: checkMusicChannelExistence,
        checkUserInVoiceChannel: checkUserInVoiceChannel,
        checkUserInSameVoiceChannelAsBot: checkUserInSameVoiceChannelAsBot,
        createMusicChannel: createMusicChannel,
        createNewMemberCard: createNewMemberCard,
        createRemovedMemberCard: createRemovedMemberCard,
        displayBotInfos: displayBotInfos,
        embed: embed,
        fetchChannel: fetchChannel,
        getBotInformations: getBotInformations,
        logLoadedHandlers: logLoadedHandlers,
        logToMusicChannel: logToMusicChannel,
        musicEmbed: musicEmbed
    }
    this.guildSettings = new GuildsProvider();

    //Theme
    // TODO need to add theme to the bot that can be changed via config file
        this.colors = {
            color: color
        }
    }

    init() {
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: 'src/inhibitors/'
        });
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