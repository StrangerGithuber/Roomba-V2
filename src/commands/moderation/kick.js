const { Command } = require('discord-akairo');
const moment = require("moment");

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            category: 'Modération',
            description: {
                content: 'La commande kick permet d\'expulser un utilisateur du serveur',
                usage: "kick <member> <reason>",
                exemples: ['kick @Alex', 'kick @Alex Spam'],
            },
            channel: "guild",
            args: [
                {id: "member", type: 'member'},
                {id: "reason", type: 'string', match: "restContent"}
            ],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS']
        });
    }

    async exec(message, { member, reason }) {
        if (!reason) reason = "Reason not specified!";
        const guildDB = await this.client.guildSettings.get(message.guild);
        await message.delete();
        if (member && member.id === message.guild.ownerId) {
            await message.delete();
            return message.channel.send("You can't kick the server owner!")
        }
        member ? await member.kick(reason) : message.channel.send("Aucun utilisateur spécifié !");
        if (guildDB.log.channel !== null){
            const logChannel = await message.guild.channels.cache.find(channel => channel.id === guildDB.log.channel);
            if (logChannel !== null){
                const embed = await this.client.functions.embed()
                    .setTitle(`Kick ${member.user.tag}`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setColor(this.client.colors.color.darkpurple)
                    .addField(`Plus d'informations à propos de **${member.user.username}**`,
                        `● ID : \`${member.user.id}\`
                    ● Bot : \`${member.user.bot ? 'Oui' : 'Non'}\`
                    ● Créé le : \`${moment(member.user.createdAt).format('DD/MM/YYYY à hh.mm').replace(".","h")}\`
                    ● Raison kick : \`${reason}\`       
                    `
                    )
                logChannel.send({ embeds: [embed]})
            }
        }
        await this.client.log.base.logCommand(message.guildId, message.author, this.id, {memberID: member.id, reason: reason});
        await message.delete();
    }
}
module.exports = KickCommand;