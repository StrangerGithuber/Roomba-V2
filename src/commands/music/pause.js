const { Command } = require('discord-akairo');
const { DMPError } = require("discord-music-player")
class PauseCommand extends Command {
    constructor() {
        super('pause', {
            aliases: ['pause'],
            category: 'Music',
            description: {
                content: 'La commande pause permet de mettre en pause la musique ou de la redémarrer !',
                usage: "pause",
                exemples: ['pause'],
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
                switch (guildQueue.paused) {
                    case true:
                        message.channel.send("Redémarrage de la musique !");
                        guildQueue.setPaused(false);
                        break;
                    case false:
                        message.channel.send("Mise en pause de la musique !");
                        guildQueue.setPaused(true);
                        break;
                }
            } else {
                message.channel.send("Aucune musique n'est actuellement entrain d'être jouée!")
            }
        }
    }
}
module.exports = PauseCommand;