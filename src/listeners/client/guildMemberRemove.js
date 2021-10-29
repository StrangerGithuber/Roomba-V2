const { Listener } = require('discord-akairo');

class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {
        const guildDB = await this.client.guildSettings.get(member.guild);
        let welcomeChannel;
        if (guildDB){
            if (guildDB.welcomeChannel !== null){
                welcomeChannel = this.client.channels.cache.get(guildDB.welcomeChannel);
                if (!welcomeChannel){
                    const checkWelcomeChannel = await member.guild.channels.cache.find(channel => channel.name === "welcome");
                    if (!checkWelcomeChannel){
                        const newWelcomeChannel = await member.guild.channels.create("Welcome", {
                            type: "GUILD_TEXT",
                            position: 1,
                            reason: "No welcome channel found, so one was created!"
                        })
                        await this.client.guildSettings.update(member.guild, {welcomeChannel: newWelcomeChannel.id});
                        welcomeChannel = this.client.channels.cache.get(newWelcomeChannel.id);
                    }else{
                        await this.client.guildSettings.update(member.guild, {welcomeChannel: checkWelcomeChannel.id});
                        welcomeChannel = checkWelcomeChannel;
                    }
                }
            }
        welcomeChannel.send({
            content: null,
            files: [await this.client.functions.createRemovedMemberCard(member)]
        });
        }
    }
}

module.exports = GuildMemberRemoveListener;