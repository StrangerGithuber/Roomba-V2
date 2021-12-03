const { Command } = require('discord-akairo');

class RestartCommand extends Command {
    constructor() {
        super('restart', {
            aliases: ['restart', 'rs'],
            description: {
                content: 'La commande restart permet de redémarrer le Roomba V2!',
                usage: 'restart',
                exemples: ['restart', 'rs'],
            },
            category: 'Dev',
            ownerOnly: true
        });
    }

    exec(message) {
        this.client.log.base.global('Restarting Roomba V2...').then(() => {
            require('child_process').execSync('pm2 restart 0');
        });
    }
}
module.exports = RestartCommand;