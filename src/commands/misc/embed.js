const { Command } = require('discord-akairo');

class EmbedCommand extends Command {
    constructor() {
        super('embed', {
            aliases: ['embed'],
            description: {
                content: 'La commande embed renvoie un embed de test!',
                usage: 'embed',
                exemples: ['embed'],
            },
            category: 'Misc',
        });
    }

    async exec(message) {
        await message.delete();
        return message.channel.send({ embeds: [
            await this.client.functions.embed()
                .setDescription("Hello")
                .setColor(this.client.colors.color.darkpurple)
            ]});
    }
}
module.exports = EmbedCommand;