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
        if (guildQueue){
            message.channel.send("Passage à la musique suivante!");
            guildQueue.skip();
        }
    }
}
module.exports = SkipCommand;