module.exports = {
    initDiscordMusicPlayerEvents: function (DiscordMusicClient, GuildSettings, AkairoClient){
        DiscordMusicClient.on('channelEmpty', async (queue) => {
            const guildDB = await GuildSettings.get(queue.guild);
            await AkairoClient.functions.logToMusicChannel(queue, guildDB, "Tout le monde à quitté le channel, déconnexion...", GuildSettings, AkairoClient);
            await AkairoClient.log.music.event(queue.guild.id, 'channelEmpty', {channelID: queue.connection.channel.id});
        })
        DiscordMusicClient.on('songAdd', async (queue, song) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, "Musique ajoutée à la liste d'attente :", GuildSettings, AkairoClient);
                await AkairoClient.log.music.event(queue.guild.id, 'songAdd', {channelID: queue.connection.channel.id, songName: song.name, author: song.author, url: song.url, duration: song.duration});
            }
        })
        DiscordMusicClient.on('playlistAdd', async (queue, playlist) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, "Playlist ajoutée à la liste d'attente!", GuildSettings, AkairoClient);
                console.log(queue);
                await AkairoClient.log.music.event(queue.guild.id, 'playlistAdd', {channelID: queue.connection.channel.id, playlistName: playlist.name, author: playlist.author, url: playlist.url, numberSong: playlist.queue.songs.length});
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
                await AkairoClient.log.music.event(queue.guild.id, 'queueEnd', {channelID: queue.connection.channel.id});
            }
        })
        DiscordMusicClient.on('songChanged', async (queue, song) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, `Lecture de la musique : ${song.name}`, GuildSettings, AkairoClient);
                await AkairoClient.log.music.event(queue.guild.id, 'songChanged', {channelID: queue.connection.channel.id, songName: song.name, author: song.author, url: song.url, duration: song.duration});
            }
        })
        DiscordMusicClient.on('clientDisconnect', async (queue) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, `Déconnexion forcée par commande modérateur !`, GuildSettings, AkairoClient);
                await AkairoClient.log.music.event(queue.guild.id, 'clientDisconnect', {channelID: queue.connection.channel.id});
            }
        })
        DiscordMusicClient.on('clientUndeafen', async (queue) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, `Un modérateur m'a rendu l'audition !`, GuildSettings, AkairoClient);
                await AkairoClient.log.music.event(queue.guild.id, 'clientUndeafen', {channelID: queue.connection.channel.id});
            }
        })
        DiscordMusicClient.on('error', async (error, queue) => {
            const guildDB = await GuildSettings.get(queue.guild);
            if (guildDB && guildDB.music.channel){
                await AkairoClient.functions.logToMusicChannel(queue, guildDB, `Une erreur est survenu : ${error}`, GuildSettings, AkairoClient);
                await AkairoClient.log.music.error(queue.guild.id, error);
            }
        })
    },

}