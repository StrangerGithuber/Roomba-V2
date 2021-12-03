const { Log } = require('../structures/Models');

class BaseLogProvider {
    constructor(name = "Base Logger", mongoModel = Log) {
        this.name = name;
        this.mongoModel = mongoModel;
        this.init().then(() => {
            this.#getCollection().then(collection => {
                this.collection = collection;
            });
        });
    }

    async init(){
        const createdCollection = await this.mongoModel.findOne({name : this.name});
        if(createdCollection.length === 0){
            await this.mongoModel.create({
                name: this.name,
                logs: [],
                info: [],
                warning: [],
                error: [],
            });
        }
    }

    async #getCollection(){
        return this.mongoModel.findOne({name: this.name}).then(collection => {
            return collection;
        });
    }

    async log(guildID, message) {
        const consoleMessage = `[LOG][${this.name}]: ${message} (${guildID})`;
        const databaseMessage = `${message}`;
        this.collection.log.push({
            guildID: guildID,
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 6))
        });
        this.collection = await this.collection.save();
        console.log(consoleMessage);
    }

    async info(guildID, message) {
        const consoleMessage = `[INFO][${this.name}]: ${message} (${guildID})`;
        const databaseMessage = `${message}`;
        await this.collection.info.push({
            guildID: guildID,
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 6))
        });
        this.collection = await this.collection.save();
        console.log(consoleMessage);
    }

    async warn(guildID, message) {
        const consoleMessage = `[WARN][${this.name}]: ${message} (${guildID})`;
        const databaseMessage = `${message}`;
        await this.collection.warn.push({
            guildID: guildID,
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 6))
        });
        this.collection = await this.collection.save();
        console.log(consoleMessage);
    }

    async error(guildID, message) {
        const consoleMessage = `[ERROR][${this.name}]: ${message} (${guildID})`;
        const databaseMessage = `${message}`;
        await this.collection.error.push({
            guildID: guildID,
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 6))
        });
        this.collection = await this.collection.save();
        console.log(consoleMessage);
    }

    async getLogs(guildID = null, type = null) {
        if (guildID === null){
            return {
                logs: this.collection.log,
                info: this.collection.info,
                warning: this.collection.warn,
                error: this.collection.error
            };
        }
        if (type === null) {
            return {
                log: this.collection["log"].filter(log => log.guildID === guildID),
                info: this.collection["info"].filter(log => log.guildID === guildID),
                warn: this.collection["warn"].filter(log => log.guildID === guildID),
                error: this.collection["error"].filter(log => log.guildID === guildID)
            };
        }
        return this.collection[type].filter(log => log.guildID === guildID);
    }
    async deleteExpiredLogs(type = "log") {
        this.collection[type] = this.collection[type].filter(log => log.expirationDate > new Date());
        this.collection = await this.collection.save();
    }
}

module.exports = { BaseLogProvider };