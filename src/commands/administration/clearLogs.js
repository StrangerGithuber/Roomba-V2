const { Command } = require('discord-akairo');

class LogCommand extends Command {
    constructor() {
        super('clearLogs', {
            aliases: ['clearLogs', 'clogs'],
            category: 'Administration',
            description: {
                content: 'La commande clearLogs permet de supprimer tous les logs du bot',
                usage: "clearLogs",
                exemples: ['clearLogs'],
            },
            channel: "guild",
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: true,
        });
    }

    async exec(message) {
        await this.client.functions.clearLogs(this.client, true);
        message.channel.send("Cleared all logs");
        await message.delete();
    }
}
module.exports = LogCommand;