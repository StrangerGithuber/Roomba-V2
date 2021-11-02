const { Command } = require('discord-akairo');
const { RepeatMode } = require("discord-music-player");

class LoopCommand extends Command {
    constructor() {
        super('loop', {
            aliases: ['loop', 'l'],
            category: 'Music',
            description: {
                content: 'La commande loop permet de mettre la musique en boucle (',
                usage: 'loopMode [loopMode]',
                exemples: ['loopMode', 'loopMode 0'],
            },
            channel: "guild",
            args: [
                {id: "loopMode", type: "number"}
            ]
        });
    }

    async exec(message, { loopMode }) {
        await message.delete();
        let guildQueue = this.client.musicPlayer.getQueue(message.guild.id);
        const channel = await this.client.functions.checkMusicChannelExistence(message, message.guild, this.client.guildSettings, this.client);
        if (channel.allowed) {
            if (guildQueue) {
                if (loopMode) {
                    if (loopMode === 0 || loopMode === 1 || loopMode === 2) {
                        switch (loopMode) {
                            case 0:
                                guildQueue.setRepeatMode(RepeatMode.DISABLED);
                                message.channel.send("Mise en boucle arrêtée !");
                                break;
                            case 1:
                                guildQueue.setRepeatMode(RepeatMode.SONG);
                                message.channel.send("Mise en boucle sur la musique actuelle !");
                                break;
                            case 2:
                                guildQueue.setRepeatMode(RepeatMode.QUEUE);
                                message.channel.send("Mise en boucle sur la liste d'attente !");
                                break;
                        }
                    } else {
                        message.channel.send("Le loop mode doit être égal à 0 (no loop), 1 (song loop), 2 (queue loop)!")
                    }
                } else {
                    let currentLoopMode = guildQueue.repeatMode;
                    switch (currentLoopMode) {
                        case 0:
                            guildQueue.setRepeatMode(RepeatMode.SONG);
                            message.channel.send("Mise en boucle sur la musique actuelle !");
                            break;
                        case 1:
                            guildQueue.setRepeatMode(RepeatMode.QUEUE);
                            message.channel.send("Mise en boucle sur la liste d'attente !");
                            break;
                        case 2:
                            guildQueue.setRepeatMode(RepeatMode.DISABLED);
                            message.channel.send("Mise en boucle arrêtée !");
                            break;
                    }
                }
            } else {
                message.channel.send("Aucune musique n'est actuellement entrain d'être jouée!")
            }
        }
    }
}
module.exports = LoopCommand;