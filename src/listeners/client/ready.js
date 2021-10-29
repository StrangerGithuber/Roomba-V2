const { Listener } = require('discord-akairo');
const ts = new Date();

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        this.client.user.setPresence({ activities: [{name: "my creation", type: "WATCHING"}], status:"dnd"});
        this.client.functions.displayBotInfos(this.client.functions.getBotInformations(this));
        console.log(` ${ts.toLocaleString()} - Roomba V2 Started`);
        console.log("════════════════════════════════════════════");
    }
}



module.exports = ReadyListener;