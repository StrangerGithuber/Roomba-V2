const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');


class SlashCommands {
    constructor(client) {
        this.client = client;
        this.commands = new Collection();
    }

    init(excludedCommands = []) {
        console.log(excludedCommands);
        const c = [];
        const pathsSlash = path.resolve(__dirname, '..', '..', 'slash_commands');
        fs.readdirSync(pathsSlash).forEach(dir => {
            let pathSubsSlash = path.resolve(__dirname, '..', '..', 'slash_commands', dir);
            const commandFiles = fs.readdirSync(pathSubsSlash).filter(file => file.endsWith(".js"));

            for (let file of commandFiles) {
                let pathFilesSlash = path.normalize(pathSubsSlash + '/') + file;
                let command = require(pathFilesSlash);
                this.commands.set(command.data.name, command);
                c.push(command.data.toJSON());
            }
        });
        const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

        (async () => {
            try {
                if(process.env.GUILDSLASH){
                    await rest.put(
                        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILDSLASH),
                        { body: commands },
                    );
                }
                else {
                    await rest.put(
                        Routes.applicationCommands(process.env.CLIENT_ID),
                        { body: commands },
                    );
                }
                await this.client.log.base.global(`Successfully reloaded application (/) commands.`);
            } catch (error) {
                console.error(error);
            }
        })();
    }

}
module.exports = SlashCommands;
