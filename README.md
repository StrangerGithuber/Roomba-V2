
![Logo](https://user-images.githubusercontent.com/64975829/140054794-231ed45a-40a3-42c0-8760-49c2ebcf7245.png)






# Roomba V2 (Dev Version)

Roomba V2 is a discord bot based on multiple librairies.  
The bot contains multiple moderation commands as well as music commands and other misc...

## Librairies



Discord JS V13                 |  Discord Akairo           |  Discord Music Player |  Mongo DB (mongoose)
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![https://discord.js.org/#/](https://user-images.githubusercontent.com/64975829/140057102-4f45c0e6-cf08-4db4-8c75-033c44dae7d5.png)  |  ![https://discord-akairo.github.io/#/](https://user-images.githubusercontent.com/64975829/140055693-25c8a35b-8d6c-4afc-8086-f47a488cb914.png?)|  ![https://discord-music-player.js.org/](https://user-images.githubusercontent.com/64975829/140056781-7b61eef1-997f-4d73-a882-5be448b97874.png?)|  ![https://www.mongodb.com/fr-fr](https://user-images.githubusercontent.com/64975829/140058764-dbdfbaff-bccd-4f29-8da6-b387ca9fbc52.png?)

## Architecture

```bash
client
   └── src
       ├── commands
       │   ├── dev
       │   │   ├── eval.js
       │   │   ├── restart.js
       │   │   └── updateAll.js
       │   ├── infos
       │   │   ├── serverinfo.js
       │   │   └── userinfo.js
       │   ├── misc
       │   │   ├── help.js
       │   │   ├── ping.js
       │   │   ├── prefix.js
       │   │   └── setting.js
       │   ├── moderation
       │   │   ├── ban.js
       │   │   └── kick.js
       │   └── music
       │       ├── loop.js
       │       ├── nowPlaying.js
       │       ├── pause.js
       │       ├── play.js
       │       ├── playlist.js
       │       ├── progression.js
       │       ├── shuffle.js
       │       ├── skip.js
       │       ├── stop.js
       │       └── volume.js
       ├── index.js
       ├── inhibitors
       │   ├── blacklist
       │   │   ├── channelBlacklist.js
       │   │   ├── guildBlacklist.js
       │   │   ├── userGlobalBlacklist.js
       │   │   └── userGuildBlacklist.js
       │   └── enabledModules
       │       └── musicModule.js
       ├── listeners
       │   ├── client
       │   │   ├── guildCreate.js
       │   │   ├── guildDelete.js
       │   │   ├── guildMemberAdd.js
       │   │   ├── guildMemberRemove.js
       │   │   └── ready.js
       │   └── commandHandler
       │       ├── commandBlocked.js
       │       ├── cooldown.js
       │       └── missingPermissions.js
       ├── logger
       │   ├── BaseLogProvider.js
       │   ├── LogProviders.js
       │   └── MusicLogProvider.js
       ├── structures
       │   ├── Models.js
       │   ├── MusicPlayer.js
       │   ├── Providers.js
       │   └── RoombaClient.js
       └── util
           ├── canvasFunctions.js
           ├── colors.js
           ├── config.js
           ├── functions.js
           └── musicPlayerEvents.js
```
## Bot Custom Colors

| Name             | Hex                                        | C
| ----------------- | ------------------------------------------ |------------------------------------------ |
| darkpurple | #9400D3 |![#9400D3](https://via.placeholder.com/10/9400D3?text=+)



## Environment Variables

You need to rename the `.env.example` to `.env` and fill in the information. Open the *.env* file with a text editor and ou can give the information without string if there is no space between the data otherwise you can put in string, such as `"Something"`.

`CLIENT_TOKEN` can be found in the discord developper section : [Here](https://discord.com/developers/applications/)   
`CLIENT_ID` can be found in the discord developper section : [Here](https://discord.com/developers/applications/)   
`MONGO_STRING` can be found when you create your mongoDB cluster : [Here](https://cloud.mongodb.com/)  
`OWNER_ID` can be found when right clicking on your account on discord with developer settings activated  
`PREFIX` you can give a default prefix which will be added into database


## Run Locally

Clone the project from github

```bash
  sudo git clone https://github.com/AlexArtaud-Dev/Roomba-V2
```

Go to the project directory

```bash
  cd Roomba-V2/
```

Install dependencies

```bash
  sudo npm install
```

Start the server with `node `

```bash
  sudo npm run start
```

Start the server with `nodemon`

```bash
// Install nodemon
  sudo npm i nodemon -g

// Run with nodemon
  sudo npm run dev
```

Start the server with `pm2`

```bash
// Install pm2
  sudo npm i pm2 -g

// Run with pm2  
  sudo npm run devmod
```

Stop `pm2` server

```bash 
  sudo npm run stop
```
## Roadmap

- Add more commands

- Add slash commands

- Add language config file to swap between languages

- Add theme config file



## Optimizations

- Created a sub-class MusicPlayer that extend Player to make the events handled automaticaly on creation
- Created Log Provider with extended class to generate custom log outputs inside console and inside database, sorted by type
- Splitted mongoose models into differents files




## License

[MIT](https://github.com/AlexArtaud-Dev/Roomba-V2/blob/main/LICENSE)


## Authors

- [@AlexArtaud-Dev](https://github.com/AlexArtaud-Dev)


## Support

For support, dm me on discord |Alex|#3227.

