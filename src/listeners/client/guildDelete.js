const { Listener } = require('discord-akairo');
const { Guild } = require("../../structures/models/Guilds");


class GuildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild) {
        const guildToDelete = await Guild.findOne({guildID: guild.id});
        if (guildToDelete) {
            await this.client.log.base.info(guild.id, `Deletion of: ${guild.name}`);
            await guildToDelete.delete();
        }
    }
}

module.exports = GuildDeleteListener;