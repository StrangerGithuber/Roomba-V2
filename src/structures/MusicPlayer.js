const {initDiscordMusicPlayerEvents} = require("../util/musicPlayerEvents");
const {Player} = require("discord-music-player");


class MusicPlayer extends Player{
    constructor(DiscordJSClient, GuildSettings, AkairoClient) {
        super(
            DiscordJSClient,
            {
                leaveOnEmpty: true,
                deafenOnJoin: true
            }
        );
        this.guildSettings = GuildSettings;
        this.akairoClient = AkairoClient;
        this.init();
    }
    init(){
        initDiscordMusicPlayerEvents(this, this.guildSettings, this.akairoClient);
    }
}

module.exports = { MusicPlayer }