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

    async global(message) {
        const consoleMessage = `[GLOBAL][${this.name}]: ${message}`;
        const databaseMessage = `${message}`;
        this.collection.global.push({
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 31))
        });
        this.collection = await this.collection.save();
        console.log(consoleMessage);
    }

    async logCommand(guildID, author, command, data = null) {
        this.collection.command.push({
            guildID: guildID,
            user: {
                userID: author.id,
                userTag: author.tag,
            },
            command: {
                name: command,
                data : data
            },
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 30))
        });
        this.collection = await this.collection.save();
    }

    async log(guildID, message) {
        const consoleMessage = `[LOG][${this.name}]: ${message} (${guildID})`;
        const databaseMessage = `${message}`;
        this.collection.log.push({
            guildID: guildID,
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 30))
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
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 30))
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
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 2))
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
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 4))
        });
        this.collection = await this.collection.save();
        console.log(consoleMessage);
    }

    async getLogs(guildID = null, type = null) {
        if (guildID === null){
            return {
                global: this.collection.global,
                command: this.collection.command,
                logs: this.collection.log,
                info: this.collection.info,
                warning: this.collection.warn,
                error: this.collection.error
            };
        }
        if (type === null) {
            return {
                command : this.collection["command"].command.filter(log => log.guildID === guildID),
                log: this.collection["log"].filter(log => log.guildID === guildID),
                info: this.collection["info"].filter(log => log.guildID === guildID),
                warn: this.collection["warn"].filter(log => log.guildID === guildID),
                error: this.collection["error"].filter(log => log.guildID === guildID)
            };
        }
        return this.collection[type].filter(log => log.guildID === guildID);
    }

    async deleteExpiredLogs(forceMod = false) {
        await this.global(`Deleted expired logs ${forceMod ? "- [FORCE MOD]" : ""}`);
        const types = ["global", "log", "info", "warn", "error", "command"];
        if (!forceMod){
            types.forEach(type => {this.collection[type] = this.collection[type].filter(log => log.expirationDate > new Date())});
        }else{
            types.forEach(type => {this.collection[type] = []});
        }
        this.collection = await this.collection.save();
    }
}

module.exports = { BaseLogProvider };