const {ProgressBar} = require("discord-music-player");
const { Command } = require('discord-akairo');

class ProgressionCommand extends Command {
    constructor() {
        super('progression', {
            aliases: ['progression'],
            category: 'Music',
            description: {
                content: 'La commande progression permet de voir la progression de la musique',
                usage: "progression",
                exemples: ['progression'],
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
                const ProgressBar = guildQueue.createProgressBar({size: 50});
                message.channel.send(`**Progression de la musique: ** \n${ProgressBar.prettier}`);
            } else {
                message.channel.send("Aucune musique n'est actuellement entrain d'être jouée!");
            }
        }
    }
}
module.exports = ProgressionCommand;