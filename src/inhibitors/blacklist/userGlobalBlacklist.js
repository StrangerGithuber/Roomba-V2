const { Inhibitor } = require('discord-akairo');

class UserGlobalBlacklistInhibitor extends Inhibitor {
    constructor() {
        super('userGlobalBlacklist', {
            reason: 'vous êtes blacklisté du bot',
            type: "post",
            priority: 1
        })
    }

    async exec(message) {
        const blacklist = await this.client.moderation.getSettingRecursively("blacklist.users");
        return blacklist.includes(message.author.id);
    }

}

module.exports = UserGlobalBlacklistInhibitor;