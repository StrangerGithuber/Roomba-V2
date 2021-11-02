const { Command } = require('discord-akairo');
const { Utils, Queue } = require('discord-music-player');
class PlaylistCommand extends Command {
    constructor() {
        super('playlist', {
            aliases: ['playlist', 'plist'],
            category: 'Music',
            description: {
                content: 'La commande playlist permet de lire une playlist depuis une URL',
                usage: "playlist <link>",
                exemples: ['playlist https://www.youtube.com/watch?v=S6KO6sdNdtk&list=PLMIozosdTy7dP1zft0MGQ5XjQANwSpquj&ab_channel=PandaMusic'],
            },
            channel: "guild",
            args: [
                {id: "url", type: 'string', match: "restContent"},
            ],
        });
    }

    async exec(message, { url }) {
        await message.delete();
        const channel = await this.client.functions.checkMusicChannelExistence(message, message.guild, this.client.guildSettings, this.client);
        if (channel.allowed){
            let guildQueue = this.client.musicPlayer.getQueue(message.guild.id);
            let queue;
            if (guildQueue){
                queue = guildQueue;
            }else{
                queue = this.client.musicPlayer.createQueue(message.guild.id);
                await queue.setData({voiceChannelID: message.member.voice.channel.id});
            }
            if (await this.client.functions.checkUserInVoiceChannel(message)){
                if (await this.client.functions.checkUserInSameVoiceChannelAsBot(message, queue)){
                    let playlistEmbed;
                    await queue.join(message.member.voice.channel);
                    const loading = await channel.channelObject.send("Chargement de la playlist ...");
                    await queue.playlist(url).then(data => {
                        loading.delete();
                        if (data){
                            playlistEmbed = this.client.functions.playlistEmbed(data.name, data.url, message.author, this.client.colors.color.darkpurple, data.songs.length);
                            channel.channelObject.send({ embeds : [playlistEmbed]});
                        }
                    }).catch(error => {
                        loading.delete();
                        channel.channelObject.send(error.message);
                    });

                }
            }
        }

    }
}
module.exports = PlaylistCommand;