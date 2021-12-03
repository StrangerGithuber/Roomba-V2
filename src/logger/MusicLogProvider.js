const { BaseLogProvider } = require('./BaseLogProvider');

class MusicLogProvider extends BaseLogProvider {
    constructor() {
        super("Music Logger");
    }
    async event(guildID, event, data) {
        await this.collection.info.push({
            guildID: guildID,
            event: {
                name: event,
                data: data
            },
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 6))
        });
        setTimeout(async () => {
            this.collection = await this.collection.save();
        },5000)
    }

    async error(guildID, error) {
        await this.collection.error.push({
            guildID: guildID,
            error: error,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 6))
        });
        setTimeout(async () => {
            this.collection = await this.collection.save();
        },5000)
    }s
}

module.exports = { MusicLogProvider };