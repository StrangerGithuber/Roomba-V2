const { Command } = require('discord-akairo');

class MusicCommand extends Command {
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
        let guildQueue = this.client.musicPlayer.getQueue(message.guild.id);
        let queue;
        if (guildQueue){
            queue = guildQueue;
        }else{
            queue = this.client.musicPlayer.createQueue(message.guild.id);
        }
        let musicEmbed = this.client.functions.embed();
        await queue.join(message.member.voice.channel);
        const loading = await message.channel.send("Recherche de la musique ...");
        await queue.play(search).then(async data => {
            setTimeout(() => {
                if (data){
                    loading.delete();
                    musicEmbed.setTitle(data.name)
                        .setURL(data.url)
                        .setThumbnail(data.thumbnail)
                        .setColor(this.client.colors.color.darkpurple)
                        .setDescription(`Musique demandée par <@${message.author.id}>`)
                        .addField("Durée", data.duration, true)
                        .addField("Statut", data.isLive ? "En Live" : "Vidéo", true)
                    message.channel.send({ embeds : [musicEmbed]})
                    const ProgressBar = queue.createProgressBar();
                    console.log(ProgressBar.prettier);
                }else{
                    loading.delete();
                    message.channel.send("Aucune musique n'a été trouvé!")
                }
            },2000)
        }).catch(error => {
            message.channel.send(error.message);
        })
    }
}
module.exports = MusicCommand;