const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class SettingCommand extends Command {
    constructor() {
        super('setting', {
            aliases: ['setting'],
            category: 'Misc',
            description: {
                content: 'La commande setting modifie le setting choisi du serveur',
                usage: "setting <settingName> <newSetting>",
                exemples: ['setting', 'setting welcomeChannel 65498321987274'],
            },
            channel: "guild",
            args: [
                {id: "settingName", type: 'string'},
                {id: "newSetting", type: 'string'}
            ]
        });
    }

    async exec(message, { settingName, newSetting }) {
        if (!settingName) return message.reply(`Veuillez préciser un setting du serveur à récuperer ou modifier: \`\`\`${await this.handler.prefix(message)}setting <settingName> <newValue>\`\`\``)
        const guildToUpdate = await Guild.findOne({ id: message.guild.id });
        if (!newSetting) return message.channel.send(`Paramètre ${settingName} actuel -> \`${this.client.functions.resolve(settingName, guildToUpdate)}\``);
        const split = settingName.split('.');
        const depth = split.length;

        if (depth === 1) {
            const setting = [];
            setting[settingName] = newSetting;
            await this.client.guildSettings.update(message.guild, setting);
        }
        if (depth > 1){
            await this.client.guildSettings.updateRecursively(guildToUpdate, newSetting, split, depth);
        }
        await message.delete();
        return message.channel.send(`Le ${settingName} du serveur est maintenant -> \`${newSetting}\``);
    }
}
module.exports = SettingCommand;