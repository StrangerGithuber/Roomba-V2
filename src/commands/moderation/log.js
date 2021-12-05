const { Command } = require('discord-akairo');

class LogCommand extends Command {
    constructor() {
        super('log', {
            aliases: ['log'],
            category: 'Modération',
            description: {
                content: 'La commande log permet de récupérer les logs du serveur',
                usage: "log",
                exemples: ['log'],
            },
            channel: "guild",
            // args: [
            //     {id: "member", type: 'member'},
            //     {id: "day", type: 'number'},
            //     {id: "reason", type: 'string', match: "restContent"}
            // ],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async exec(message) {
        
    }
}
module.exports = LogCommand;