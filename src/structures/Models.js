const mongoose = require('mongoose');


const guildSchema = new mongoose.Schema({
    guildID: String,
    prefix: {
        type: String,
        required: false,
        default : '!'
    },
    blacklist: {
        channels: {
            type: Array,
            required: false,
            default: []
        },
        users: {
            type: Array,
            required: false,
            default: []
        },
        roles: {
            type: Array,
            required: false,
            default: []
        }
    },
    welcome: {
        enabled: {
            type: Boolean,
            required: false,
            default: false
        },
        channel: {
            type: String,
            required: false,
            default: null
        },
    },
    log: {
        enabled: {
            type: Boolean,
            required: false,
            default: false
        },
        channel: {
            type: String,
            required: false,
            default: null
        },
    },
    music: {
        enabled: {
            type: Boolean,
            required: false,
            default: false
        },
        channel: {
            type: String,
            required: false,
            default: null
        },
    },
})

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


module.exports = {
    Guild: mongoose.model('Guild', guildSchema),
    Moderation: mongoose.model('Moderation', moderationSchema)
}