const mongoose = require('mongoose');

const moderationSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 1
    },
    blacklist: {
        guilds: {
            type: Array,
            required: false,
            default: []
        },
        users: {
            type: Array,
            required: false,
            default: []
        },
    }
})

var Moderations = mongoose.model('Moderation', moderationSchema);
module.exports = {
    Moderation: Moderations
}