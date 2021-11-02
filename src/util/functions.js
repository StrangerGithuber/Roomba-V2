const {MessageEmbed} = require("discord.js");
const { createNewMemberCard, createRemovedMemberCard } = require("./canvasFunctions");
module.exports = {
    checkUserInVoiceChannel: async function (message){
        let bool = false;
        if (message.member.voice.channel !== null){
            bool = true;
        }else{
            message.channel.send("Vous devez être dans un channel vocal pour éxecuter cette commande !")
        }
        return bool;
    },
    checkUserInSameVoiceChannelAsBot: async function(message, queue){
        let bool = false;
        if (queue.data.voiceChannelID === message.member.voice.channel.id){
            bool = true;
        }else{
            message.channel.send("Vous devez être dans le même channel vocal que le bot pour effectuer cette commande !")
        }
        return bool;
    },
    checkMusicChannelExistence: async function (currentMessage, guild, GuildProvider, AkairoClient){
        const guildDB = await GuildProvider.get(guild);
        let channel = {
            allowed: false,
            channelObject: null
        };
        if (guildDB){
            if (guildDB.musicChannel){
                if (currentMessage.channel.id.toString() === guildDB.musicChannel.toString()){
                    channel.allowed = true;
                    channel.channelObject = currentMessage.channel;
                }else{
                    const fetchedChannel = await currentMessage.guild.channels.cache.find(c => c.id === guildDB.musicChannel.toString());
                    if (fetchedChannel){
                        channel.allowed = false;
                        currentMessage.channel.send("Vous devez être dans le channel musique pour effectuer cette commande !");
                    }else{
                        currentMessage.channel.send("Le channel musique n'a pas été initilisé, création par défaut !");
                        channel.allowed = true;
                        channel.channelObject = await this.createMusicChannel(guild, GuildProvider, AkairoClient);
                    }
                }
            }else{
                currentMessage.channel.send("Le channel musique n'a pas été initilisé, création par défaut !");
                channel.allowed = true;
                channel.channelObject = await this.createMusicChannel(guild, GuildProvider, AkairoClient);
            }
        }
        return channel;
    },
    createMusicChannel: async function (guild, GuildProvider, AkairoClient){
        const newMusicChannel = await guild.channels.create("Musique", {
            type: "GUILD_TEXT",
            position: 1,
            reason: "No welcome music channel found, so one was created!"
        })
        await GuildProvider.update(guild, {musicChannel: newMusicChannel.id});
        return AkairoClient.channels.cache.get(newMusicChannel.id);
    },
    createNewMemberCard: async function (member) {
        return await createNewMemberCard(member);
    },
    createRemovedMemberCard : async function (member) {
        return await createRemovedMemberCard(member);
    },
    displayBotInfos: function(informations){
        console.log("═════════════════ Watching ═════════════════");
        console.log("════════════════════════════════════════════");
        console.log(`▶ ${informations.servers} ${informations.servers > 1 ? "servers" : "server"}`);
        console.log(`\t⬤ ${informations.textChannels} text ${informations.textChannels > 1 ? "channels" : "channel"}`);
        console.log(`\t⬤ ${informations.voiceChannels} voice ${informations.voiceChannels > 1 ? "channels" : "channel"}`);
        console.log(`▶ ${informations.users} ${informations.users > 1 ? "users" : "user"}`);
        console.log(`\t⬤ ${informations.usersNotBot} ${informations.usersNotBot > 1 ? "real users" : "real user"}`);
        console.log(`\t⬤ ${informations.bots} ${informations.bots > 1 ? "bots" : "bot"}`);
        console.log("════════════════════════════════════════════");
    },
    embed: function () {
        return new MessageEmbed().setColor("#FFFFFF");
    },
    fetchChannel: async function(AkairoClient, channelID){
        return await AkairoClient.channels.cache.find(c => c.id === channelID);
    },
    getBotInformations: function (thisClient){
        return {
            servers: thisClient.client.guilds.cache.size,
            users: thisClient.client.users.cache.size,
            voiceChannels: thisClient.client.channels.cache.filter(c => !c.isText()).size,
            textChannels: thisClient.client.channels.cache.filter(c => c.isText()).size,
            usersNotBot: thisClient.client.users.cache.filter(u => !u.bot).size,
            bots: thisClient.client.users.cache.filter(u => u.bot).size
        }
    },
    logLoadedHandlers : function (commandHandler, listenerHandler, inhibitorHandler){
        console.clear();
        console.log("════════════════════════════════════════════");
        console.log(`═══════════ ${commandHandler.modules.size} Loaded Commands ══════════════`);
        console.log("════════════════════════════════════════════");
        commandHandler.categories.forEach((val) => {
            console.log(`▶ ${val} Category :`);
            val.forEach(r => {
                console.log(`\t⬤ ${r.id}`)
            })
        })

        console.log("════════════════════════════════════════════");
        console.log(`═══════════ ${listenerHandler.modules.size} Loaded Listeners ═════════════`);
        console.log("════════════════════════════════════════════");
        listenerHandler.categories.forEach(val => {
            val.forEach(r => {
                console.log("▶ " + r.id);
            })
        })
        console.log("════════════════════════════════════════════");

        console.log("════════════════════════════════════════════");
        console.log(`══════════ ${inhibitorHandler.modules.size} Loaded Inhibitors ═════════════`);
        console.log("════════════════════════════════════════════");
        inhibitorHandler.categories.forEach(val => {
            val.forEach(r => {
                console.log("▶ " + r.id);
            })
        })
        console.log("════════════════════════════════════════════");
    },
    logToMusicChannel : async function (queue, guildDB, message, GuildsProvider, AkairoClient){
        if (guildDB.musicChannel){
            const musicChannel = await queue.guild.channels.cache.find(channel => channel.id === guildDB.musicChannel.toString());
            if (musicChannel){
                await musicChannel.send(message)
            }else{
                const musicChannel = await this.createMusicChannel(queue.guild, GuildsProvider, AkairoClient);
                if (musicChannel){
                    await musicChannel.send(message)
                }
            }
        }else{
            const musicChannel = await this.createMusicChannel(queue.guild, GuildsProvider, AkairoClient);
            if (musicChannel){
                await musicChannel.send(message)
            }
        }
    },
    musicEmbed: function (title, URL, duration, status, thumbnail, author, color, queueSize){
        let musicEmbed = new MessageEmbed();
        musicEmbed.setTitle(title)
            .setURL(URL)
            .setThumbnail(thumbnail)
            .setColor(color)
            .setDescription(`Musique demandée par <@${author.id}>`)
            .addField("Durée", duration, true)
            .addField("Statut", status ? "En Live" : "Vidéo", true)
            .addField("File d'attente", queueSize.toString(), true);
        return musicEmbed;
    },
    playlistEmbed: function (title, URL, author, color, numberSongs){
        let playlistEmbed = new MessageEmbed();
        playlistEmbed.setTitle(title)
            .setURL(URL)
            .setColor(color)
            .setDescription(`Playlist demandée par <@${author.id}>`)
            .addField("File d'attente", numberSongs.toString(), true);
        return playlistEmbed;
    }
}