const { Command } = require('discord-akairo');
const fs = require('fs');

function convertToEuropeanDate (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours().toString().length === 1 ? ("0" + date.getHours()) : date.getHours();
    const minute = date.getMinutes().toString().length === 1 ? ("0" + date.getMinutes()) : date.getMinutes();
    const second = date.getSeconds().toString().length === 1 ? ("0" + date.getSeconds()) : date.getSeconds();
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

class LogCommand extends Command {
    constructor() {
        super('log', {
            aliases: ['log'],
            category: 'Modération',
            description: {
                content: 'La commande log permet de récupérer les logs du serveur',
                usage: "log",
                exemples: ['log'],
            },
            channel: "guild",
            args: [
                {id: "loggerType", type: 'string', default: null},
                {id: "typeFilter", type: 'string', default: null},
            ],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async exec(message, {loggerType, typeFilter}) {
        const basicLogs = message.author.id === this.client.ownerID ? await this.client.log.base.getLogs() : await this.client.log.base.getLogs(message.guild.id);
        const musicLogs = message.author.id === this.client.ownerID ? await this.client.log.music.getLogs() : await this.client.log.music.getLogs(message.guild.id);
        const defaultTypes = ["global", "command", "log", "info", "warning", "error"];
        const defaultLoggers = ["base", "music"];
        if (loggerType) loggerType = loggerType.toLowerCase();
        if (loggerType !== null && !defaultLoggers.includes(loggerType)) return message.channel.send("Le type de logger que vous souhaitez récupérer n'existe pas");
        if (typeFilter) typeFilter = typeFilter.toLowerCase();
        if (typeFilter === "global" && message.author.id !== this.client.ownerID) return message.channel.send("Vous n'avez pas la permission de consulter ce type de logs");
        const types = typeFilter != null ? [typeFilter] : defaultTypes;
        if (typeFilter !== null && !defaultTypes.includes(typeFilter)) return message.channel.send("Le type de log que vous souhaitez récupérer n'existe pas");
        const stream = fs.createWriteStream(`log.txt`);

        stream.once('open', fd => {
            switch (loggerType) {
                case "base":
                    fs.writeSync(fd, `███████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n`);
                    fs.writeSync(fd, `████████████████████████████████████████████████████ BASIC LOGGER █████████████████████████████████████████████████\n`);
                    fs.writeSync(fd, `███████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n\n`);
                    types.forEach(type => {
                        if (basicLogs[type]) {
                            switch (type){
                                case "global":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}] ${log.message}\n`);
                                    });
                                    break;
                                case "command":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.user.userTag} (${log.user.userID}) : command ${log.command.name} ${log.command.data === null ? "" : "with data -> " + JSON.stringify(log.command.data)} \n`);
                                    });
                                    break;
                                case "log":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "info":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "warning":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "error":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}]ERROR : ${log.message}\n`);
                                    });
                                    break;
                            }
                        }
                    })
                    break;
                case "music":
                    fs.writeSync(fd, `\n\n\n███████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n`);
                    fs.writeSync(fd, `████████████████████████████████████████████████████ MUSIC LOGGER █████████████████████████████████████████████████\n`);
                    fs.writeSync(fd, `███████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n\n`);
                    types.forEach(type => {
                        if (musicLogs[type]) {
                            switch (type){
                                case "global":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}] ${log.message}\n`);
                                    });
                                    break;
                                case "command":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.user.userTag} (${log.user.userID}) : command ${log.command.name} ${log.command.data === null ? "" : "with data -> " + JSON.stringify(log.command.data)} \n`);
                                    });
                                    break;
                                case "log":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "info":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] Event : "${log.event.name}" ${log.event.data === null ? "" : "with data -> " + JSON.stringify(log.event.data)} \n`);
                                    });
                                    break;
                                case "warning":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "error":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}]${log.error}\n`);
                                    });
                                    break;
                            }
                        }
                    })
                    break;
                default :
                    fs.writeSync(fd, `███████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n`);
                    fs.writeSync(fd, `████████████████████████████████████████████████████ BASIC LOGGER █████████████████████████████████████████████████\n`);
                    fs.writeSync(fd, `███████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n\n`);
                    types.forEach(type => {
                        if (basicLogs[type]) {
                            switch (type){
                                case "global":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}] ${log.message}\n`);
                                    });
                                    break;
                                case "command":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.user.userTag} (${log.user.userID}) : command ${log.command.name} ${log.command.data === null ? "" : "with data -> " + JSON.stringify(log.command.data)} \n`);
                                    });
                                    break;
                                case "log":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "info":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "warning":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "error":
                                    fs.writeSync(fd, `\n`);
                                    basicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}]ERROR : ${log.message}\n`);
                                    });
                                    break;
                            }
                        }
                    })
                    fs.writeSync(fd, `\n\n\n███████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n`);
                    fs.writeSync(fd, `████████████████████████████████████████████████████ MUSIC LOGGER █████████████████████████████████████████████████\n`);
                    fs.writeSync(fd, `███████████████████████████████████████████████████████████████████████████████████████████████████████████████████\n\n`);
                    types.forEach(type => {
                        if (musicLogs[type]) {
                            switch (type){
                                case "global":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}] ${log.message}\n`);
                                    });
                                    break;
                                case "command":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.user.userTag} (${log.user.userID}) : command ${log.command.name} ${log.command.data === null ? "" : "with data -> " + JSON.stringify(log.command.data)} \n`);
                                    });
                                    break;
                                case "log":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "info":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] Event : "${log.event.name}" ${log.event.data === null ? "" : "with data -> " + JSON.stringify(log.event.data)} \n`);
                                    });
                                    break;
                                case "warning":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}] ${log.message}\n`);
                                    });
                                    break;
                                case "error":
                                    fs.writeSync(fd, `\n`);
                                    musicLogs[type].forEach(log => {
                                        fs.writeSync(fd, `[${type.toUpperCase()}][Base Logger][${convertToEuropeanDate(log.date)}][${log.guildID}]${log.error}\n`);
                                    });
                                    break;
                            }
                        }
                    })
                    break;
            }

            stream.end();
            const date = new Date();
            const fileName = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
            message.channel.send({
                files: [{
                    attachment: 'log.txt',
                    name: `log_${fileName}.txt`
                }]
            });

        });



    }
}
module.exports = LogCommand;