const { Inhibitor } = require('discord-akairo');

class UserBlacklistInhibitor extends Inhibitor {
    constructor() {
        super('channelBlacklist', {
            reason: 'ce salon est blacklisté',
            type: "post",
            priority: 1
        })
    }

    async exec(message) {
        const blacklist = await this.client.guildSettings.getSetting(message.guild, "blackListedChannels");
        return blacklist.includes(message.channel.id);
    }
}

module.exports = UserBlacklistInhibitor;