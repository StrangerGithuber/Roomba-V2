const { Command } = require('discord-akairo');


class UpdateAllCommand extends Command {
    constructor() {
        super('updateAll', {
            aliases: ['updateAll', 'uptall'],
            description: {
                content: 'La commande permet de mettre à jour les différents model du bot en DB!',
                usage: 'updateAll',
                exemples: ['updateAll', 'uptall'],
            },
            category: 'Dev',
            ownerOnly: true
        });
    }

    async exec(message) {
        await Guild.updateMany({}, { log: { enabled: true, channel: null }, music: { enabled: true, channel: null }  }, { upsert: true }).then(
            c => console.log(`Found Servers: ${c.matchedCount} and Updated: ${c.modifiedCount}`)
        );
    }
}
module.exports = UpdateAllCommand;