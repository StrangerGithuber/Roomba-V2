const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            category: 'Misc',
            description: {
                content: 'La commande prefix modifie le prefix du serveur',
                usage: "prefix <newPrefix>",
                exemples: ['prefix', 'prefix !'],
            },
            channel: "guild",
            args: [
                {id: "newPrefix", type: 'string'}
            ]
        });
    }

    async exec(message, { newPrefix }) {
        if (!newPrefix) return message.channel.send(`Prefix actuel -> \`${await this.handler.prefix(message)}\``);
        await this.client.guildSettings.update(message.guild, {prefix: newPrefix});
        await message.delete();
        return message.channel.send(`Le prefix du serveur est maintenant -> \`${newPrefix}\``);
    }
}
module.exports = PrefixCommand;