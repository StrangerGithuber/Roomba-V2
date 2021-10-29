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
        await Guild.create({
            guildID: guild.id,
        }, error => {
            if(error) return console.log(error);
            console.log(`Nouveau serveur -> ${guild.name} (${guild.id})`);
        })
    }
}

module.exports = GuildCreateListener;