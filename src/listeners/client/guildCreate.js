const { Listener } = require('discord-akairo');
const { Guild } = require("../../structures/Models");


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
            await Guild.create({
                guildID: guild.id,
            }, error => {
                if(error) return console.log(error);
                console.log(`Nouveau serveur -> ${guild.name} (${guild.id})`);
            })
        }
    }
}

module.exports = GuildCreateListener;