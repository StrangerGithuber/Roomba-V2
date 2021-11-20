module.exports = {
    initDiscordMusicPlayerEvents: function (DiscordMusicClient, GuildSettings, AkairoClient){
        console.log(GuildSettings);
        DiscordMusicClient.on('channelEmpty', async (queue) => {
            const guildDB = await GuildSettings.get(queue.guild);
            await AkairoClient.functions.logToMusicChannel(queue, guildDB, "Tout le monde à quitté le channel, déconnexion...", GuildSettings, AkairoClient);
        })
        DiscordMusicClient.on('songAdd', async (queue, song) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, "Musique ajoutée à la liste d'attente :", GuildSettings, AkairoClient);
            }
        })
        DiscordMusicClient.on('playlistAdd', async (queue, playlist) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, "Playlist ajoutée à la liste d'attente!", GuildSettings, AkairoClient);
                // const musicChannel = await fetchChannel(AkairoClient, guildDB.music.channel);
                // if (musicChannel){
                //     musicChannel.send(`Playlist ajoutée à la liste d'attente!`);
                // }
            }
        })
        DiscordMusicClient.on('queueEnd', async (queue) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, "Fin de la file d'attente !", GuildSettings, AkairoClient);
            }
        })
        DiscordMusicClient.on('songChanged', async (queue, song) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, `Lecture de la musique : ${song.name}`, GuildSettings, AkairoClient);
            }
        })
        DiscordMusicClient.on('clientDisconnect', async (queue) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, `Déconnexion forcée par commande modérateur !`, GuildSettings, AkairoClient);
            }
        })
        DiscordMusicClient.on('clientUndeafen', async (queue) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, `Un modérateur m'a rendu l'audition !`, GuildSettings, AkairoClient);
            }
        })
        DiscordMusicClient.on('error', async (error, queue) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, `Une erreur est survenu : ${error}`, GuildSettings, AkairoClient);
            }
        })
    },

}