const { Command } = require('discord-akairo');

module.exports = class RegisterSlashCommandsCommand extends Command {
    constructor() {
        super('registerSlashCommands', {
            aliases: ['registerSlashCommands', 'slashR'],
            description: {
                content: 'La commande registerSlashCommands permet d\'enregistrer les commandes slash. (need to wait 1h30 to use them after)',
                usage: 'registerSlashCommands',
                exemples: ['registerSlashCommands'],
            },
            category: 'Administration',
            ownerOnly: true,
            args: [
                {
                    id: 'forceReload',
                    type: 'string',
                },
            ],
        });
    }

    async exec(message, { forceReload }) {
        if (forceReload === "true") {
            const alreadyRegisteredCommands = await this.client.guildSettings.getSetting(message.guild, "registeredSlashCommands");
            this.client.slashCommandProvider.init(alreadyRegisteredCommands);
            this.client.log.base.global(`Slash commands reloaded`);
        }else{
            this.client.slashCommandProvider.init();
            this.client.log.base.global(`Slash commands reloaded`);
        }

    }
};