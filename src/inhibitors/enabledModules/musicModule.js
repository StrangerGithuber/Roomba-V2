const { Inhibitor } = require('discord-akairo');

class MusicModuleInhibitor extends Inhibitor {
    constructor() {
        super('musicModule', {
            reason: 'le module de musique n\'est pas activé sur ce serveur.',
            type: "post",
            priority: 1
        })
    }

    async exec(message) {
        let bool = false;
        const musicCommands = [];
        const prefix = await this.client.guildSettings.getSetting(message.guild, 'prefix');
        const enabledModule = await this.client.guildSettings.getSettingRecursively(message.guild, 'music.enabled');
        if (!enabledModule) {
            this.client.commandHandler.categories.forEach((val) => {
                if (val.id === 'Music'){
                    val.forEach(r => {
                        r.aliases.forEach(a => {
                            musicCommands.push(a);
                        })
                    })
                }
            })
            if (musicCommands.includes(message.toString().replace(prefix, '').split(' ')[0])) {
                bool = true;
            }
        }
        if (message.author.id === process.env.OWNER_ID) bool = false;
        return bool;
    }
}

module.exports = MusicModuleInhibitor;