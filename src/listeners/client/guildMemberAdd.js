const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    async exec(member) {
        const guildDB = await this.client.guildSettings.get(member.guild);
        if(!member.user.bot){
            await this.client.log.base.info(member.guild.id, `Joining member: ${member.user.tag} in ${member.guild.name}`);
            if (guildDB.welcome.enabled){
                let welcomeChannel;
                if (guildDB){
                    if (guildDB.welcome.channel !== null){
                        welcomeChannel = this.client.channels.cache.get(guildDB.welcome.channel);
                        if (!welcomeChannel){
                            const checkWelcomeChannel = await member.guild.channels.cache.find(channel => channel.name === "welcome");
                            if (!checkWelcomeChannel){
                                const newWelcomeChannel = await member.guild.channels.create("Welcome", {
                                    type: "GUILD_TEXT",
                                    position: 1,
                                    reason: "No welcome channel found, so one was created!"
                                })
                                await this.client.guildSettings.update(member.guild, {welcome: {channel : newWelcomeChannel.id, enabled: guildDB.welcome.enabled}});
                                welcomeChannel = this.client.channels.cache.get(newWelcomeChannel.id);
                            }else{
                                await this.client.guildSettings.update(member.guild, {welcome: {channel : checkWelcomeChannel.id, enabled: guildDB.welcome.enabled}});
                                welcomeChannel = checkWelcomeChannel;
                            }
                        }
                    }else{
                        const checkWelcomeChannel = await member.guild.channels.cache.find(channel => channel.name === "welcome");
                        if (!checkWelcomeChannel){
                            const newWelcomeChannel = await member.guild.channels.create("Welcome", {
                                type: "GUILD_TEXT",
                                position: 1,
                                reason: "No welcome channel found, so one was created!"
                            })
                            await this.client.guildSettings.update(member.guild, {welcome: {channel : newWelcomeChannel.id, enabled: guildDB.welcome.enabled}});
                            welcomeChannel = this.client.channels.cache.get(newWelcomeChannel.id);
                        }else{
                            await this.client.guildSettings.update(member.guild, {welcome: {channel : checkWelcomeChannel.id, enabled: guildDB.welcome.enabled}});
                            welcomeChannel = checkWelcomeChannel;
                        }
                    }
                    welcomeChannel.send({
                        content: null,
                        files: [await this.client.functions.createNewMemberCard(member)]
                    });
                }
            }
        }
    }
}

module.exports = GuildMemberAddListener;