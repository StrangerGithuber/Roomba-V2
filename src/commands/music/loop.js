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
                exemples: ['loop', 'loop 0'],
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
                        let currentLoopMode = guildQueue.repeatMode;
                        if (currentLoopMode === loopMode) return message.channel.send("Vous êtes déjà dans ce mode de boucle !");
                        switch (loopMode) {
                            case 0:
                                guildQueue.setRepeatMode(RepeatMode.DISABLED);
                                message.channel.send("Mise en boucle arrêtée !");
                                await this.client.log.music.logCommand(message.guildId, message.author, this.id, {loop: "stopped", type: "manual"});
                                break;
                            case 1:
                                guildQueue.setRepeatMode(RepeatMode.SONG);
                                message.channel.send("Mise en boucle sur la musique actuelle !");
                                await this.client.log.music.logCommand(message.guildId, message.author, this.id, {loop: "song", type: "manual"});
                                break;
                            case 2:
                                guildQueue.setRepeatMode(RepeatMode.QUEUE);
                                message.channel.send("Mise en boucle sur la liste d'attente !");
                                await this.client.log.music.logCommand(message.guildId, message.author, this.id, {loop: "queue", type: "manual"});
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
                            await this.client.log.music.logCommand(message.guildId, message.author, this.id, {loop: "song", type: "automatic"});
                            break;
                        case 1:
                            guildQueue.setRepeatMode(RepeatMode.QUEUE);
                            message.channel.send("Mise en boucle sur la liste d'attente !");
                            await this.client.log.music.logCommand(message.guildId, message.author, this.id, {loop: "queue", type: "automatic"});
                            break;
                        case 2:
                            guildQueue.setRepeatMode(RepeatMode.DISABLED);
                            message.channel.send("Mise en boucle arrêtée !");
                            await this.client.log.music.logCommand(message.guildId, message.author, this.id, {loop: "stopped", type: "automatic"});
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