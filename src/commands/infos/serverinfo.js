const { Command } = require('discord-akairo');
const moment = require("moment");

class ServerinfoCommand extends Command {
    constructor() {
        super('serverinfo', {
            aliases: ['serverinfo', "sinfo"],
            category: 'Infos',
            description: {
                content: 'La commande serverinfo renvoie des informations sur le serveur !',
                usage: "serverinfo",
                exemples: ['serverinfo'],
            },
            ignoreCooldown: '259741670323650571',
            ignorePermissions: '259741670323650571',
            ratelimit: 2,
            cooldown: "3000",
            ownerOnly: true,
            channel: "guild",
        });
    }

    async exec(message) {
        const owner = await message.guild.fetchOwner();
        await message.delete();
        return message.channel.send({
            embeds: [
                await this.client.functions.embed()
                    .setTitle(`${message.guild.name} (${message.guild.id})`)
                    .setThumbnail(message.guild.iconURL())
                    .setColor(this.client.colors.color.darkpurple)
                    .addField(`Plus d'informations à propos du serveur`,
`● Propriétaire : \`${owner.user.tag} (${owner.id})\`
● Nombre Utilisateurs : \`${(await message.guild.members.fetch()).filter(m => !m.user.bot).size}\`
● Nombre de bots : \`${(await message.guild.members.fetch()).filter(m => m.user.bot).size}\`
● Créé le : \`${moment(message.guild.createdAt).format('DD/MM/YYYY à hh.mm').replace(".","h")}\`
● Statut : \`${message.guild.verified ? "Vérifié" : "Non Vérifié"}\`
● Description Serveur : ${message.guild.description ? message.guild.description : "Pas de description"}
`
                    )
            ]
        })
    }
}
module.exports = ServerinfoCommand;