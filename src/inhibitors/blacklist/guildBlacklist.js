const { Inhibitor } = require('discord-akairo');

class GuildBlacklistInhibitor extends Inhibitor {
    constructor() {
        super('guildBlacklist', {
            reason: 'le serveur est blacklisté du bot',
            type: "post",
            priority: 1
        })
    }

    async exec(message) {
        const blacklist = await this.client.moderation.getSettingRecursively("blacklist.guilds");
        await this.client.functions.leaveBlacklistedGuild(message.guild, message.guild.client.users.cache.find(u => u.id === message.guild.ownerId), 500);
        return blacklist.includes(message.guild.id);
    }

}

module.exports = GuildBlacklistInhibitor;