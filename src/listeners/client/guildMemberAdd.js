const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    exec(member) {
        console.log(`Bonjour à toi : ${member.user.tag}`);
        console.log(member.guild.icon)
    }
}

module.exports = GuildMemberAddListener;