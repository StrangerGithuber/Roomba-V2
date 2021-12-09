const { Command } = require('discord-akairo');
class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            description: {
                content: 'La commande help renvoie la liste de commande du administration!',
                usage: 'help <commande>',
                exemples: ['help', 'help ping', 'h ping'],
            },
            category: 'Misc',
            args: [{id: 'command', type: "commandAlias"}]
        });
    }

    async exec(message, { command }) {
        const prefix = await this.handler.prefix(message);
        if (!command) {
            let embed = this.client.functions.embed()
                .setAuthor(
                    `Bonjour, mon nom est ${this.client.user.username}!`,
                    this.client.user.displayAvatarURL()
                )
                .setColor(this.client.colors.color.darkpurple)
                .setDescription(`Retrouvez la liste de toutes nos commandes ci-dessous!
                 Si vous avez besoin d'assistance rejoignez [notre serveur](https://placeholder.com)
                 **――――――――――――**`)

            for (const category of this.handler.categories.values()) {
                await embed.addField(
                    `⚈ ${category.id}`,
                    `${category
                        .filter(cmd => cmd.aliases.length > 0)
                        .map(cmd => `\`${cmd.aliases[0]}\``)
                        .join(', ')}`
                )
            }
            await embed.addField('**――――――――――――**', `**\`${prefix}help <commande>\` pour des infos sur une commande spécifique.**
                Exemples: \`${prefix}help ping\` | \`${prefix}help userinfo\``)
            await this.client.log.base.logCommand(message.guildId, message.author, this.id);
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

        await message.delete();
        await this.client.log.base.logCommand(message.guildId, message.author, this.id, command.id);
        return message.channel.send({embeds: [embed]})
    }

}
module.exports = HelpCommand;