const { Listener } = require('discord-akairo');

class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {
        const blacklist = await this.client.moderation.getSettingRecursively("blacklist.guilds");
        if (blacklist.includes(guild.id)){
            await this.client.functions.leaveBlacklistedGuild(guild, guild.client.users.cache.find(u => u.id === guild.ownerId), 500);
        }else{
            await this.client.guildSettings.create(guild);
        }
    }
}

module.exports = GuildCreateListener;