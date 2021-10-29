const { Command } = require('discord-akairo');
const moment = require("moment");

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            category: 'Modération',
            description: {
                content: 'La commande ban permet de bannir un utilisateur du serveur',
                usage: "ban <member> <reason>",
                exemples: ['ban @Alex', 'ban @Alex Spam'],
            },
            channel: "guild",
            args: [
                {id: "member", type: 'member'},
                {id: "day", type: 'number'},
                {id: "reason", type: 'string', match: "restContent"}
            ],
            clientPermissions: ['KICK_MEMBERS', 'BAN_MEMBERS'],
            userPermissions: ['KICK_MEMBERS', 'BAN_MEMBERS']
        });
    }

    async exec(message, { member, day, reason }) {
        if (!reason) reason = "Reason not specified!";
        if (!day) day = 7;
        if (day > 7) return message.channel.send("La limite de temps de bannissement est 7 jours!");
        const guildDB = await this.client.guildSettings.get(message.guild);
        if (member && member.id === message.guild.ownerId) {
            await message.delete();
            return message.channel.send("You can't ban the server owner!")
        }
        member ? await member.ban({days: day, reason: reason}) : message.channel.send("Aucun utilisateur spécifié !");
        if (guildDB.logChannel !== null){
            const logChannel = await message.guild.channels.cache.find(channel => channel.id === guildDB.logChannel);
            if (logChannel !== null){
                const embed = await this.client.functions.embed()
                    .setTitle(`Ban ${member.user.tag}`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setColor(this.client.colors.color.darkpurple)
                    .addField(`Plus d'informations à propos de **${member.user.username}**`,
                        `● ID : \`${member.user.id}\`
                    ● Bot : \`${member.user.bot ? 'Oui' : 'Non'}\`
                    ● Créé le : \`${moment(member.user.createdAt).format('DD/MM/YYYY à hh.mm').replace(".","h")}\`
                    ● Temps : \`${day} ${day > 1 ? "jours" : "jour"}\`       
                    ● Raison ban : \`${reason}\`       
                    `
                    )
                logChannel.send({ embeds: [embed]})
            }
        }
        await message.delete();
    }
}
module.exports = BanCommand;