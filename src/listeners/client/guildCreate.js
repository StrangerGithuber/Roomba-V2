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
            await this.client.log.base.warn(guild.id, `Attempt to join a banned guild: ${guild.name}`);
            await this.client.functions.leaveBlacklistedGuild(guild, guild.client.users.cache.find(u => u.id === guild.ownerId), 500);
        }else{
            await this.client.guildSettings.create(guild);
            await this.client.log.base.info(guild.id, `Guild joined: ${guild.name}`);
        }
    }
}

module.exports = GuildCreateListener;