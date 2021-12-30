const { Listener } = require('discord-akairo');
const ts = new Date();

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        this.client.user.setPresence({ activities: [{name: "my creation", type: "WATCHING"}], status:"dnd"});
        await this.client.functions.generateModels(this.client);
        this.client.functions.displayBotInfos(this.client.functions.getBotInformations(this));
        console.log(` ${ts.toLocaleString()} - Roomba V2 Started`);
        console.log("════════════════════════════════════════════");
        await this.client.log.base.global(`Roomba V2 Started`);
        
        const commands = [];
        const pathsslash = path.resolve(__dirname, '..', '..', 'slash_commands');
        fs.readdirSync(pathsslash).forEach(dir => {
            let pathsubsslash = path.resolve(__dirname, '..', '..', 'slash_commands', dir);
            const commandFiles = fs.readdirSync(pathsubsslash).filter(file => file.endsWith(".js"));
    
            for (let file of commandFiles) {
                let pathfilesslash = path.normalize(pathsubsslash + '/') + file;
                let command = require(pathfilesslash);
                this.client.slashCommand.set(command.data.name, command);
                commands.push(command.data.toJSON());
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



module.exports = ReadyListener;
