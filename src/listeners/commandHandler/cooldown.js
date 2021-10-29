const { Listener } = require('discord-akairo');

class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    async exec(message, command, remaining) {
        const embed = this.client.functions.embed()
            .setTitle("Cooldown")
            .addField(`Plus d'informations :`, `
                ● Statut : Commande en cooldown
                ● Temps restant :   \`\`\`${Math.round(remaining / 1000)}ms\`\`\` 
                ● Commande : \`\`\`${await this.client.guildSettings.getSetting(message.guild, "prefix")}${command.id}\`\`\` 
            `)
        return await message.reply({embeds: [embed]});
    }
}



module.exports = CooldownListener;