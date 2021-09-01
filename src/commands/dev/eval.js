const { Command } = require('discord-akairo');

const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports = class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            description: {
                content: 'La commande eval permet d\'éxécuter du code sur le serveur du bot!',
                usage: 'eval <code>',
                exemples: ['eval console.log("test")'],
            },
            category: 'Dev',
            ownerOnly: true,
            args: [
                {
                    id: 'code',
                    match: 'content',
                },
            ],
        });
    }

    async exec(message, { code }) {
        try {
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};