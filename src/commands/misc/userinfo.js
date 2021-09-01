const { Command } = require('discord-akairo');
const moment = require("moment");

class UserinfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', "info"],
            category: 'Misc',
            description: {
                content: 'La commande userinfo renvoie des informations sur l\'utilisateur!!',
                usage: "userinfo <member>",
                exemples: ['userinfo @member', 'userinfo', 'info @member'],
            },
            ignoreCooldown: '259741670323650571',
            ignorePermissions: '259741670323650571',
            userPermissions: "KICK_MEMBERS",
            clientPermissions: "KICK_MEMBERS",
            ratelimit: 2,
            cooldown: "3000",
            ownerOnly: true,
            channel: "guild",
            args: [
                {id: "member", type: 'member', default: message => message.member}
            ]
        });
    }

    exec(message, args) {
        console.log(args.member)
        return message.channel.send({ embeds: [
            this.client.functions.embed()
                .setTitle(`${args.member.displayName} (${args.member.id})`)
                .setThumbnail(args.member.user.displayAvatarURL())
                .setColor(this.client.colors.color.darkpurple)
                .addField(`Plus d'informations à propos de **${args.member.user.username}**`,
                    `● Nom : \`${args.member.user.tag}\`
                        ● Bot : \`${args.member.user.bot ? 'Oui' : 'Non'}\`
                        ● Crée le : \`${moment(args.member.user.createdAt).format('DD/MM/YYYY | hh.mm')}\`
                        ● Statut : \`${args.member.presence ? args.member.presence.status.toUpperCase() : "Inconnu"}\`
                        ● Image Profil : **[Lien](${args.member.user.displayAvatarURL({format: 'png', dynamic: 'true'})})**
            
                        L'utilisateur **${args.member.user.username}** ${args.member.nickname ? `aka **${args.member.nickname}**` : ''} a rejoint le \`${moment(message.member.joinedAt).format('DD/MM/YYYY | hh.mm')}\` et possède les rôles suivants : ${args.member.roles.cache.map(roles => `\`${roles.name}\``).toString().replace(',`@everyone`', '')}.
                        `
                )
            ] })
    }
}
module.exports = UserinfoCommand;