const { Inhibitor } = require('discord-akairo');

class UserBlacklistInhibitor extends Inhibitor {
    constructor() {
        super('userBlacklist', {
            reason: 'vous êtes blacklisté du bot sur ce serveur',
            type: "post",
            priority: 2
        })
    }

    async exec(message) {
        const blacklist = await this.client.guildSettings.getSetting(message.guild, "blackListedUsers");
        return blacklist.includes(message.author.id);
    }
}

module.exports = UserBlacklistInhibitor;