const { Log } = require('../structures/models/Logs');

class BaseLogProvider {
    constructor(name = "Base Logger", mongoModel = Log) {
        this.name = name;
        this.mongoModel = mongoModel;
        this.init();
    }

    async init(){
        const createdCollection = await this.mongoModel.findOne({name : this.name});
        if(createdCollection === null || createdCollection === undefined){
            await this.mongoModel.create({
                name: this.name,
                logs: [],
                info: [],
                warning: [],
                error: [],
            });
        }
    }

    async global(message) {
        const consoleMessage = `[GLOBAL][${this.name}]: ${message}`;
        const databaseMessage = `${message}`;
        const object = {
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 31))
        };
        await this.mongoModel.findOneAndUpdate({name: this.name}, {$push: {global: object}});
        console.log(consoleMessage);
    }

    async logCommand(guildID, author, command, data = null) {
        const object = {
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
        };
        await this.mongoModel.findOneAndUpdate({name: this.name}, {$push: {command: object}});
    }

    async log(guildID, message) {
        const consoleMessage = `[LOG][${this.name}]: ${message} (${guildID})`;
        const databaseMessage = `${message}`;
        const object = {
            guildID: guildID,
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 30))
        };
        await this.mongoModel.findOneAndUpdate({name: this.name}, {$push: {log: object}});
        console.log(consoleMessage);
    }

    async info(guildID, message) {
        const consoleMessage = `[INFO][${this.name}]: ${message} (${guildID})`;
        const databaseMessage = `${message}`;
        const object = {
            guildID: guildID,
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 30))
        };
        await this.mongoModel.findOneAndUpdate({name: this.name}, {$push: {info: object}});
        console.log(consoleMessage);
    }

    async warn(guildID, message) {
        const consoleMessage = `[WARN][${this.name}]: ${message} (${guildID})`;
        const databaseMessage = `${message}`;
        const object = {
            guildID: guildID,
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 2))
        };
        await this.mongoModel.findOneAndUpdate({name: this.name}, {$push: {warn: object}});
        console.log(consoleMessage);
    }

    async error(guildID, message) {
        const consoleMessage = `[ERROR][${this.name}]: ${message} (${guildID})`;
        const databaseMessage = `${message}`;
        const object = {
            guildID: guildID,
            message: databaseMessage,
            date: new Date(),
            expirationDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 4))
        };
        await this.mongoModel.findOneAndUpdate({name: this.name}, {$push: {error: object}});
        console.log(consoleMessage);
    }

    async getLogs(guildID = null, type = null) {
        const collection = await this.mongoModel.findOne({name: this.name});
        if (guildID === null){
            return {
                global: collection.global.reverse(),
                command: collection.command.reverse(),
                logs: collection.log.reverse(),
                info: collection.info.reverse(),
                warning: collection.warn.reverse(),
                error: collection.error.reverse()
            };
        }
        if (type === null) {
            return {
                command : collection["command"].filter(log => log.guildID === guildID).reverse(),
                log: collection["log"].filter(log => log.guildID === guildID).reverse(),
                info: collection["info"].filter(log => log.guildID === guildID).reverse(),
                warn: collection["warn"].filter(log => log.guildID === guildID).reverse(),
                error: collection["error"].filter(log => log.guildID === guildID).reverse()
            };
        }
        return collection[type].filter(log => log.guildID === guildID).reverse();
    }

    async deleteExpiredLogs(forceMod = false) {
        const collection = await this.mongoModel.findOne({name: this.name});
        await this.global(`Deleted expired logs ${forceMod ? "- [FORCE MOD]" : ""}`);
        const types = ["global", "log", "info", "warn", "error", "command"];
        if (!forceMod){
            types.forEach(type => {collection[type] = collection[type].filter(log => log.expirationDate > new Date())});
        }else{
            types.forEach(type => {collection[type] = []});
        }
        await collection.save();
    }
}

module.exports = { BaseLogProvider };