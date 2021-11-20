const { Listener } = require('discord-akairo');
const { Guild } = require("../../structures/Models");


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
            await guildToDelete.delete();
        }
    }
}

module.exports = GuildDeleteListener;