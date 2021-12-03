const { Command } = require('discord-akairo');

class StopCommand extends Command {
    constructor() {
        super('stop', {
            aliases: ['stop', 's'],
            category: 'Music',
            description: {
                content: 'La commande stop permet de stopper la musique et de faire se déconnecter le bot!',
                usage: "stop",
                exemples: ['stop'],
            },
            channel: "guild",
        });
    }

    async exec(message) {
        await message.delete();
        let guildQueue = this.client.musicPlayer.getQueue(message.guild.id);
        const channel = await this.client.functions.checkMusicChannelExistence(message, message.guild, this.client.guildSettings, this.client);
        if (channel.allowed) {
            if (guildQueue) {
                if (await this.client.functions.checkUserInVoiceChannel(message)) {
                    if (await this.client.functions.checkUserInSameVoiceChannelAsBot(message, guildQueue)) {
                        message.channel.send("Arrêt de la musique! Déconnexion...");
                        guildQueue.stop();
                        await this.client.log.music.logCommand(message.guildId, message.author, this.id, null);
                    }
                }
            } else {
                message.channel.send("Aucune musique n'est actuellement entrain d'être jouée!")
            }
        }
    }
}
module.exports = StopCommand;