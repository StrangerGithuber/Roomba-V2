const { Listener } = require('discord-akairo');
const ts = new Date();

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        this.client.user.setPresence({ activities: [{name: "my creation", type: "WATCHING"}], status:"dnd"});
        await this.client.functions.generateModels(this.client);
        this.client.functions.displayBotInfos(this.client.functions.getBotInformations(this));
        console.log(` ${ts.toLocaleString()} - Roomba V2 Started`);
        console.log("════════════════════════════════════════════");
    }
}



module.exports = ReadyListener;