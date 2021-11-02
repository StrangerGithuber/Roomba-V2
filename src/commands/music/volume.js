const { Command } = require('discord-akairo');

class VolumeCommand extends Command {
    constructor() {
        super('volume', {
            aliases: ['volume', 'v'],
            category: 'Music',
            description: {
                content: 'La commande volume permet de connaitre ou de modifier le volume de la musique jouée par le bot',
                usage: 'volume [rate]',
                exemples: ['volume', 'volume 100'],
            },
            channel: "guild",
            args: [
                {id: "volume", type: 'number'},
            ]
        });
    }

    async exec(message, { volume }) {
        await message.delete();
        let guildQueue = this.client.musicPlayer.getQueue(message.guild.id);
        const channel = await this.client.functions.checkMusicChannelExistence(message, message.guild, this.client.guildSettings, this.client);
        if (channel.allowed) {
            if (guildQueue) {
                if (volume) {
                    if (volume <= 100 && volume >= 0) {
                        message.channel.send(`Volume modifié à ${volume}%`);
                        guildQueue.setVolume(volume);
                    } else {
                        message.channel.send("Le volume doit être compris entre 0 et 100 %")
                    }
                } else {
                    message.channel.send(`Le volume actuel du bot est de : **${guildQueue.volume}%**`);
                }
            } else {
                message.channel.send("Aucune musique n'est actuellement entrain d'être jouée!")
            }
        }
    }
}
module.exports = VolumeCommand;