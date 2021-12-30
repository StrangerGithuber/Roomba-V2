const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/models/Guilds')

class UpdateAllCommand extends Command {
    constructor() {
        super('updateAll', {
            aliases: ['updateAll', 'uptall'],
            description: {
                content: 'La commande permet de mettre à jour les différents model du administration en DB!',
                usage: 'updateAll',
                exemples: ['updateAll', 'uptall'],
            },
            category: 'Administration',
            ownerOnly: true
        });
    }

    async exec(message) {
        await Guild.updateMany({}, { log: { enabled: true, channel: null }, music: { enabled: true, channel: null }  }, { upsert: true }).then(
            (c) => {
                console.log(`Found Servers: ${c.matchedCount} and Updated: ${c.modifiedCount}`);
                message.util.reply(`Found Servers: ${c.matchedCount} and Updated: ${c.modifiedCount}`);
            });
    }
}
module.exports = UpdateAllCommand;
