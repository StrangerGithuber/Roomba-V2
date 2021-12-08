const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            category: 'Administration',
            description: {
                content: 'La commande prefix modifie le prefix du serveur',
                usage: "prefix <newPrefix>",
                exemples: ['prefix', 'prefix !'],
            },
            channel: "guild",
            args: [
                {id: "newPrefix", type: 'string'}
            ],
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    async exec(message, { newPrefix }) {
        if (!newPrefix) return message.channel.send(`Prefix actuel -> \`${await this.handler.prefix(message)}\``);
        await this.client.log.base.logCommand(message.guildId, message.author, this.id, {oldPrefix: await this.handler.prefix(message), newPrefix : newPrefix});
        await this.client.guildSettings.update(message.guild, {prefix: newPrefix});
        await message.delete();
        return message.channel.send(`Le prefix du serveur est maintenant -> \`${newPrefix}\``);
    }
}
module.exports = PrefixCommand;