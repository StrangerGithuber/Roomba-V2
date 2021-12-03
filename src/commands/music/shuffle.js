const { Command } = require('discord-akairo');

class ShuffleCommand extends Command {
    constructor() {
        super('shuffle', {
            aliases: ['shuffle'],
            category: 'Music',
            description: {
                content: 'La commande shuffle permet de mélanger les musiques de la liste d\'attente !',
                usage: "shuffle",
                exemples: ['shuffle'],
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
                message.channel.send("La liste d'attente vient d'être mélangée ! ");
                await this.client.log.music.logCommand(message.guildId, message.author, this.id, null);
                guildQueue.shuffle();
            } else {
                message.channel.send("Aucune musique n'est actuellement entrain d'être jouée!")
            }
        }
    }
}
module.exports = ShuffleCommand;