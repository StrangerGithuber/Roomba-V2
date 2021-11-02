const { Command } = require('discord-akairo');

class NowPlayingCommand extends Command {
    constructor() {
        super('nowPlaying', {
            aliases: ['nowPlaying', 'now'],
            category: 'Music',
            description: {
                content: 'La commande nowPlaying permet de connaitre la musique jouée par le bot',
                usage: 'nowPlaying',
                exemples: ['nowPlaying', 'now'],
            },
            channel: "guild",
        });
    }

    async exec(message) {
        await message.delete();
        let guildQueue = this.client.musicPlayer.getQueue(message.guild.id);
        const channel = await this.client.functions.checkMusicChannelExistence(message, message.guild, this.client.guildSettings, this.client);
        if (channel.allowed) {
            if (guildQueue) {
                const nowPlaying = await guildQueue.nowPlaying;
                if (nowPlaying) {
                    let musicEmbed = this.client.functions.musicEmbed("Musique en cours : " + nowPlaying.name, nowPlaying.url, nowPlaying.duration, nowPlaying.isLive, nowPlaying.thumbnail, message.author, this.client.colors.color.darkpurple, nowPlaying.queue.songs.length);
                    message.channel.send({embeds: [musicEmbed]});
                } else {
                    message.channel.send(`Aucune musique n'est actuellement entrain d'être jouée!`);
                }
            } else {
                message.channel.send("Aucune musique n'est actuellement entrain d'être jouée!")
            }
        }
    }
}
module.exports = NowPlayingCommand;