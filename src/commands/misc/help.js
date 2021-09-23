const { Command } = require('discord-akairo');
const { stripIndents } = require("common-tags")
class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            description: {
                content: 'La commande help renvoie la liste de commande du bot!',
                usage: 'help <commande>',
                exemples: ['help', 'help ping', 'h ping'],
            },
            category: 'Misc',
            args: [{id: 'command', type: "commandAlias"}]
        });
    }

    async exec(message, args) {
        const prefix = await this.handler.prefix(message);
        const command = args.command;

        if (!command) {
            let embed = this.client.functions.embed()
                .setAuthor(
                    `Bonjour, mon nom est ${this.client.user.username}!`,
                    this.client.user.displayAvatarURL()
                )
                .setColor(this.client.colors.color.darkpurple)
                .setDescription(`Retrouvez la liste de toutes nos commandes ci-dessous!
                 Si vous avez besoin d'assistance rejoigner [notre serveur](https://placeholder.com)
                 **――――――――――――**`)

            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `⚈ ${category.id}`,
                    `${category
                        .filter(cmd => cmd.aliases.length > 0)
                        .map(cmd => `\`${cmd.aliases[0]}\``)
                        .join(', ')}`
                )
            }
            embed.addField('**――――――――――――**', `**\`${prefix}help <commande>\` pour des infos sur une commande spécifique.**
                Exemples: \`${prefix}help ping\` | \`${prefix}help userinfo\``)
            return message.channel.send({embeds: [embed]})
        }


        let embed = this.client.functions.embed()
            .setColor(this.client.colors.color.darkpurple)
            .setTitle(`**Command Help : \`${command.aliases[0]}\`**`)
            .setDescription(`
                **―――――――――――――――――――――**
                **Description**:
                 ${command.description.content}\n
                **Usage**: \`${prefix}${command.description.usage}\`\n
                **Aliase(s)**: \`${prefix}${command.aliases.join(` , ${prefix}`)}\`
                **―――――――――――――――――――――**
            `)


        return message.channel.send({embeds: [embed]})
        // return message.channel.send(stripIndents`
        // \`\`\`makefile
        // [Help : Command => ${command.aliases[0]}] ${command.ownerOnly ? '/!\\ Admin Only /!\\' : ''}
        //
        // ${command.description.content}
        //
        // Utilisation: ${prefix}${command.description.usage}
        // Exemples: ${prefix}${command.description.exemples.join(` | ${prefix}`)}
        //
        // \`\`\``);
    }

}
module.exports = HelpCommand;