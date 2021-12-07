const { Guild } = require("../models/Guilds");
const {resolve} = require("../../util/functions");


class GuildsProvider {
    async create(guild){
        const existingGuild = await this.get(guild);
        if (!existingGuild){
            await Guild.create({
                guildID: guild.id,
            }, error => {
                if(error) return console.log(error);
                console.log(`Nouveau serveur -> ${guild.name} (${guild.id})`);
            })
        }
    }
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
    async getSettingRecursively(guild, pathToSetting){
        const data = await this.get(guild);
        if (data){
            return resolve(pathToSetting, data);
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
    async updateRecursively(guildToUpdate, newSetting, split, depth){
        let count = -1;
        function recursiveObject(obj, count, depth, split, newSetting) {
            count ++;
            if (count === depth - 1){
                obj[split[count]] = newSetting;
            } else {
                recursiveObject(obj[split[count]], count, depth, split, newSetting);
            }
        }
        recursiveObject(guildToUpdate, count, depth, split, newSetting);
        await guildToUpdate.save();
    }
    async delete(guild){
        let data = await this.get(guild);
        if (data){
            await data.delete();
        }
    }
}

module.exports = { GuildsProvider }