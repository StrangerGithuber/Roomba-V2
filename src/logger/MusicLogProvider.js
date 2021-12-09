const { BaseLogProvider } = require('./BaseLogProvider');

class MusicLogProvider extends BaseLogProvider {
    constructor() {
        super("Music Logger");
    }
    async event(guildID, event, data) {
        const object = {
            guildID: guildID,
            event: {
                name: event,
                data: data
            },
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 30))
        };
        await this.mongoModel.findOneAndUpdate({name: this.name}, {$push: {info: object}});
    }

    async error(guildID, error) {
        const object = {
            guildID: guildID,
            error: error,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 12))
        };
        await this.mongoModel.findOneAndUpdate({name: this.name}, {$push: {error: object}});
    }s
}

module.exports = { MusicLogProvider };