const RoombaClient = require("./structures/RoombaClient");

let client = new RoombaClient({
    prefix: '!'
});

client.login("ODc3OTM4OTAxMDU3MTQ2OTEw.YR56UQ.UIM4UqlIfxsG4y9yq0XqtvdnQ-U")
    .then(() => {
        console.log("Roomba V2 connected")
    }
)