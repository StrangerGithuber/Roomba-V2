const { Guild } = require("./Models");


class GuildsProvider {
    async get(guild){
        const data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
    }
    async getSetting(guild, setting){
        const data = await this.get(guild);
        if (data){
            return data[setting];
        }
    }

    async update(guild, settings){
        let data = await this.get(guild);
        if (typeof data !== "object") data = {}
        for (const key in settings){
            if (data[key] !== settings[key]) data[key] = settings[key]
        }
        await data.save();
    }
    async delete(guild){
        let data = await this.get(guild);
        if (data){
            await data.delete();
        }
    }
}

module.exports = { GuildsProvider }