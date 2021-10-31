const { Listener } = require('discord-akairo');

class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    async exec(message, command, reason) {
        const prefix = await this.client.guildSettings.getSetting(message.guild, "prefix");
        return message.reply(`Votre commande \`${prefix}${command}\` a été bloquée car ${reason}`);
    }
}



module.exports = CommandBlockedListener;