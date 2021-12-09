require('dotenv').config()

const RoombaClient = require("./structures/RoombaClient");

let client = new RoombaClient({
    prefix: '!'
});

client.start();
