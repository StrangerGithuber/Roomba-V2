const RoombaClient = require("./structures/RoombaClient");
const { CLIENT_TOKEN } = require('./util/config');

let client = new RoombaClient({
    prefix: '!'
});

client.login(CLIENT_TOKEN);