const { Listener } = require('discord-akairo');

class MissingPermissionsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    async exec(message, command, type, missing) {
        const embed = this.client.functions.embed();
        if (type === 'client'){
            embed
                .setTitle("Permissions manquantes")
                .addField(`Plus d'informations :`, `
                    ● Utilisateur : Roomba V2
                    ● Permission${missing.length > 1 ? "s" : ""} :   \`\`\`${missing}\`\`\` 
                    ● Commande : \`\`\`${await this.client.guildSettings.getSetting(message.guild, "prefix")}${command.id}\`\`\` 
                `)
            await this.client.log.base.warn(message.guild.id, `Roomba V2 missing permissions for ${command.id} -> ${missing.join(', ')}`);
            return await message.reply({embeds: [embed]});
        }else{
            embed
                .setTitle("Permissions manquantes")
                .addField(`Plus d'informations :`,
                `● Utilisateur : ${message.author.tag}
                ● Permission${missing.length > 1 ? "s" : ""} :   \`\`\`${missing}\`\`\` 
                ● Commande : \`\`\`${await this.client.guildSettings.getSetting(message.guild, "prefix")}${command.id}\`\`\` 
                `)
            await this.client.log.base.warn(message.guild.id, `${message.author.tag} missing permissions for ${command.id} -> ${missing.join(', ')}`);
            return await message.reply({embeds: [embed]});
        }
    }
}



module.exports = MissingPermissionsListener;