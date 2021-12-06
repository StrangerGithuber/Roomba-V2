const { Moderation } = require("../models/Moderations");
const {resolve} = require("../../util/functions");

class ModerationProvider {
    async create(){
        const existingModeration = await this.get();
        if (!existingModeration){
            await Moderation.create({
                id: 1,
            }, error => {
                if(error) return console.log(error);
                console.log(`Moderation Model deployed`);
            })
        }
    }
    async get(){
        const data = await Moderation.findOne({ id: 1 });
        if (data) return data;
    }
    async getSetting(setting){
        const data = await this.get();
        if (data){
            return data[setting];
        }
    }
    async getSettingRecursively(pathToSetting){
        const data = await this.get();
        if (data){
            return resolve(pathToSetting, data);
        }
    }
    async update(settings){
        let data = await this.get();
        if (typeof data !== "object") data = {}
        for (const key in settings){
            if (data[key] !== settings[key]) data[key] = settings[key]
        }
        await data.save();
    }
    async updateRecursively(newSetting, split, depth){
        const guildToUpdate = await this.get();
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
    async delete(){
        let data = await this.get();
        if (data){
            await data.delete();
        }
    }
}

module.exports = { ModerationProvider }