const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildID: String,
    prefix: {
        type: String,
        required: false,
        default : '!'
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
    }
})


module.exports = {
    Guild: mongoose.model('Guild', guildSchema)
}