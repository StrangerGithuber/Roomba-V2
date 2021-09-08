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
        console.log(` ${ts.toLocaleString()} - Roomba V2 Started`);
        console.log("════════════════════════════════════════════");
    }
}

module.exports = ReadyListener;