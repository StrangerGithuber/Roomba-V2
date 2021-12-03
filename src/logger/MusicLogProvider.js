const { BaseLogProvider } = require('./BaseLogProvider');

class MusicLogProvider extends BaseLogProvider {
    constructor() {
        super("Music Logger");
    }
}

module.exports = { MusicLogProvider };