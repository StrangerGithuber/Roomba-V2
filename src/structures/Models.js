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

const baseLogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    global: {
        type: Array,
        required: false,
        default: []
    },
    command: {
        type: Array,
        required: false,
        default: []
    },
    log: {
        type: Array,
        required: false,
        default: []
    },
    info: {
        type: Array,
        required: false,
        default: []
    },
    warn: {
        type: Array,
        required: false,
        default: []
    },
    error: {
        type: Array,
        required: false,
        default: []
    }
})


module.exports = {
    Guild: mongoose.model('Guild', guildSchema),
    Moderation: mongoose.model('Moderation', moderationSchema),
    Log: mongoose.model('Logs', baseLogSchema)
}