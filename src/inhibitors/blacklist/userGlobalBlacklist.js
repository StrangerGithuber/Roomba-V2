const { Inhibitor } = require('discord-akairo');

class UserGlobalBlacklistInhibitor extends Inhibitor {
    constructor() {
        super('userGlobalBlacklist', {
            reason: 'vous êtes blacklisté du administration',
            type: "post",
            priority: 1
        })
    }

    async exec(message) {
        let blacklist = await this.client.moderation.getSettingRecursively("blacklist.users");
        if (blacklist === undefined || null){
            await this.client.moderation.create();
            blacklist = await this.client.moderation.getSettingRecursively("blacklist.users");
        }
        if (message.author.id === process.env.OWNER_ID) return false;
        return blacklist.includes(message.author.id);
    }

}

module.exports = UserGlobalBlacklistInhibitor;