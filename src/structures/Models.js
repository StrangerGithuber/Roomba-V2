const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildID: String,
    prefix: {
        type: String,
        required: false,
        default : '!'
    },
    blackListedUsers: {
        type: Array,
        required: false,
        default: []
    },
    blackListedChannels: {
        type: Array,
        required: false,
        default: []
    },
    welcomeChannel: {
        type: String,
        required: false,
        default: null
    },
    logChannel: {
        type: String,
        required: false,
        default: null
    },
    musicChannel: {
        type: String,
        required: false,
        default: null
    }
})


module.exports = {
    Guild: mongoose.model('Guild', guildSchema)
}