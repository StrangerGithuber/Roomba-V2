const { Inhibitor } = require('discord-akairo');
const {OWNER_ID} = require("../../util/config");

class ChannelBlacklistInhibitor extends Inhibitor {
    constructor() {
        super('channelBlacklist', {
            reason: 'ce salon est blacklisté',
            type: "post",
            priority: 1
        })
    }

    async exec(message) {
        let blacklist = await this.client.guildSettings.getSettingRecursively(message.guild, "blacklist.channels");
        if (blacklist === undefined || null){
            await this.client.guildSettings.create(message.guild);
            blacklist = await this.client.guildSettings.getSettingRecursively(message.guild, "blacklist.channels");
        }
        if (message.author.id === OWNER_ID) return false;
        return blacklist.includes(message.channel.id);
    }
}

module.exports = ChannelBlacklistInhibitor;