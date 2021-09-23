const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildID: String,
    prefix: {
        type: String,
        required: false,
        default : '!'
    }
})


module.exports = {
    Guild: mongoose.model('Guild', guildSchema)
}