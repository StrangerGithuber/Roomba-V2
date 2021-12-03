const { Command } = require('discord-akairo');

class PlayCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play', 'p'],
            category: 'Music',
            description: {
                content: 'La commande play permet de lire une musique depuis une recherche ou une URL',
                usage: "play <search>",
                exemples: ['play Never Gonna give you up', 'play https://www.youtube.com/watch?v=xoWxv2yZXLQ&ab_channel=LeagueofLegends'],
            },
            channel: "guild",
            args: [
                {id: "search", type: 'string', match: "restContent"},
            ],
        });
    }

    async exec(message, { search }) {
        await message.delete();
        const channel = await this.client.functions.checkMusicChannelExistence(message, message.guild, this.client.guildSettings, this.client);
        if (channel.allowed){
            let guildQueue = this.client.musicPlayer.getQueue(message.guild.id);
            let queue;
            if (await this.client.functions.checkUserInVoiceChannel(message)){
                if (guildQueue){
                    queue = guildQueue;
                }else{
                    queue = this.client.musicPlayer.createQueue(message.guild.id);
                    await queue.setData({voiceChannelID: message.member.voice.channel.id});
                }
                if (await this.client.functions.checkUserInSameVoiceChannelAsBot(message, queue)){
                    let musicEmbed;
                    await queue.join(message.member.voice.channel);
                    const loading = await channel.channelObject.send("Recherche de la musique ...");
                    await queue.play(search).then(async data => {
                        setTimeout(() => {
                            if (data){
                                loading.delete();
                                musicEmbed = this.client.functions.musicEmbed(data.name, data.url, data.duration, data.isLive, data.thumbnail, message.author, this.client.colors.color.darkpurple, queue.songs.length)
                                channel.channelObject.send({ embeds : [musicEmbed]})
                            }else{
                                loading.delete();
                                channel.channelObject.send("Aucune musique n'a été trouvé!")
                            }
                        },2000)
                    await this.client.log.music.logCommand(message.guildId, message.author, this.id, {search: search});
                    }).catch(error => {
                        this.client.log.music.error(message.guildId, error.message);
                        channel.channelObject.send(error.message);
                    })
                }
            }
        }

    }
}
module.exports = PlayCommand;