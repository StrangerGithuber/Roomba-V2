const { Inhibitor } = require('discord-akairo');

class UserGuildBlacklistInhibitor extends Inhibitor {
    constructor() {
        super('userGuildBlacklist', {
            reason: 'vous êtes blacklisté du administration sur ce serveur',
            type: "post",
            priority: 2
        })
    }

    async exec(message) {
        let blacklist = await this.client.guildSettings.getSettingRecursively(message.guild, "blacklist.users");
        if (blacklist === undefined || null){
            await this.client.guildSettings.create(message.guild);
            blacklist = await this.client.guildSettings.getSettingRecursively(message.guild, "blacklist.users");
        }
        if (message.author.id === process.env.OWNER_ID) return false;
        return blacklist.includes(message.author.id);
    }

}

module.exports = UserGuildBlacklistInhibitor;