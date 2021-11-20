const { Inhibitor } = require('discord-akairo');
const {OWNER_ID} = require("../../util/config");

class GuildBlacklistInhibitor extends Inhibitor {
    constructor() {
        super('guildBlacklist', {
            reason: 'le serveur est blacklisté du bot',
            type: "post",
            priority: 1
        })
    }

    async exec(message) {
        let blacklist = await this.client.moderation.getSettingRecursively("blacklist.guilds");
        if (blacklist === undefined || null){
            await this.client.moderation.create();
            blacklist = await this.client.moderation.getSettingRecursively("blacklist.guilds");
        }
        if (blacklist.includes(message.guild.id)){
            await this.client.functions.leaveBlacklistedGuild(message.guild, message.guild.client.users.cache.find(u => u.id === message.guild.ownerId), 500);
        }
        if (message.author.id === OWNER_ID) return false;
        return blacklist.includes(message.guild.id);
    }

}

module.exports = GuildBlacklistInhibitor;