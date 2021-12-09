const { Listener } = require('discord-akairo');

class InteractionCreateListener extends Listener {
    constructor() {
        super('interactionCreate', {
            emitter: 'client',
            event: 'interactionCreate'
        });
    }

    async exec(interaction) {

        if (!interaction.isCommand()) return;
        const command = this.client.slashCommandProvider.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction, this.client);
        } catch (error) {
            if (error) console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}



module.exports = InteractionCreateListener;
