const {MessageEmbed} = require("discord.js");
const { createNewMemberCard, createRemovedMemberCard } = require("./canvasFunctions");
module.exports = {
    embed: function () {
        return new MessageEmbed().setColor("#FFFFFF");
    },
    getBotInformations: function (thisClient){
        return {
            servers: thisClient.client.guilds.cache.size,
            users: thisClient.client.users.cache.size,
            voiceChannels: thisClient.client.channels.cache.filter(c => !c.isText()).size,
            textChannels: thisClient.client.channels.cache.filter(c => c.isText()).size,
            usersNotBot: thisClient.client.users.cache.filter(u => !u.bot).size,
            bots: thisClient.client.users.cache.filter(u => u.bot).size
        }
    },
    displayBotInfos: function(informations){
        console.log("═════════════════ Watching ═════════════════");
        console.log("════════════════════════════════════════════");
        console.log(`▶ ${informations.servers} ${informations.servers > 1 ? "servers" : "server"}`);
        console.log(`\t⬤ ${informations.textChannels} text ${informations.textChannels > 1 ? "channels" : "channel"}`);
        console.log(`\t⬤ ${informations.voiceChannels} voice ${informations.voiceChannels > 1 ? "channels" : "channel"}`);
        console.log(`▶ ${informations.users} ${informations.users > 1 ? "users" : "user"}`);
        console.log(`\t⬤ ${informations.usersNotBot} ${informations.usersNotBot > 1 ? "real users" : "real user"}`);
        console.log(`\t⬤ ${informations.bots} ${informations.bots > 1 ? "bots" : "bot"}`);
        console.log("════════════════════════════════════════════");
    },
    createNewMemberCard: async function (member) {
        return await createNewMemberCard(member);
    },
    createRemovedMemberCard : async function (member) {
        return await createRemovedMemberCard(member);
    },
}