const { Command } = require('discord-akairo');

class SkipCommand extends Command {
    constructor() {
        super('skip', {
            aliases: ['skip'],
            category: 'Music',
            description: {
                content: 'La commande skip permet de lancer la prochaine musique de la file d\'attente',
                usage: "skip",
                exemples: ['skip'],
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
                message.channel.send("Passage à la musique suivante!");
                guildQueue.skip();
                await this.client.log.music.logCommand(message.guildId, message.author, this.id, null);
            } else {
                message.channel.send("Aucune musique n'est actuellement entrain d'être jouée!");
            }
        }
    }
}
module.exports = SkipCommand;