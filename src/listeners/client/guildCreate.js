const { Listener } = require('discord-akairo');
const { Guild } = require("../../structures/Models");


class GuildCreateAddListener extends Listener {
    constructor() {
        super('guildCreateAdd', {
            emitter: 'client',
            event: 'guildCreateAdd'
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

module.exports = GuildCreateAddListener;