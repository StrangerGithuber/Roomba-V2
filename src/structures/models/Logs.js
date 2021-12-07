const mongoose = require('mongoose');

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
    Log: mongoose.model('Logs', baseLogSchema),
}