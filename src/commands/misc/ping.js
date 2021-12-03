const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: {
                content: 'La commande ping renvoie la latence du bot!',
                usage: 'ping',
                exemples: ['ping'],
            },
            category: 'Misc',
        });
    }

    async exec(message) {
        const sentMessage = await message.channel.send("Pong");
        const timestamp = message.editedTimestamp ? message.editedTimestamp : message.createdTimestamp;
        const botLantency = `${'```'}\n ${Math.round(sentMessage.createdTimestamp - timestamp)}ms   ${'```'}`;
        const apiLantency = `${'```'}\n ${Math.round(message.client.ws.ping)}ms   ${'```'}`;

        const embed = this.client.functions.embed()
            .setTitle('Pong!  🏓')
            .setColor(this.client.colors.color.darkpurple)
            .addField('Latence du bot', botLantency, true)
            .addField('Latence de l\'API', apiLantency, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp();
        await message.delete();
        await this.client.log.base.logCommand(message.guildId, message.author, this.id, {botLatency: botLantency.replaceAll("`", "").replaceAll("'", "").replaceAll(" ","").replaceAll("\n", ""), apiLatency : apiLantency.replaceAll("`", "").replaceAll("'", "").replaceAll(" ","").replaceAll("\n", "")});
        await sentMessage.edit({
            content: null,
            embeds: [embed]
        })
    }
}
module.exports = PingCommand;