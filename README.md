
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
   ├──src
   │  ├───commands
   │  │   ├───dev
   │  │   ├───infos
   │  │   ├───misc
   │  │   ├───moderation
   │  │   └───music
   │  ├───inhibitors
   │  │   └───blacklist
   │  ├───listeners
   │  │   ├───client
   │  │   └───commandHandler
   │  ├───structures
   │  └───util
```
## Bot Custom Colors

| Name             | Hex                                        | C
| ----------------- | ------------------------------------------ |------------------------------------------ |
| darkpurple | #9400D3 |![#9400D3](https://via.placeholder.com/10/9400D3?text=+)



## Environment Variables

To run this project, you will need to add the following environment variables to your ```src/util/config.js ``` file

```js
module.exports = {
    CLIENT_TOKEN: '<discord client token>',
    MONGO_STRING: "mongodb+srv://<pseudo>:<password>@<cluster>.mongodb.net/<dataBaseName>?retryWrites=true&w=majority"
}

```
`CLIENT_TOKEN` can be found in the discord developper section : [Here](https://discord.com/developers/applications/)  
`MONGO_STRING` can be found when you create your mongoDB cluster : [Here](https://cloud.mongodb.com/)

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

- Need to split mongoose models into differents files, with a controller

- Add more commands

- Add slash commands

- Add language config file to swap between languages

- Add theme config file



## Optimizations

- Created a sub-class MusicPlayer that extend Player to make the events handled automaticaly on creation
- Created Log Provider with extended class to generate custom log outputs inside console and inside database, sorted by type




## License

[MIT](https://github.com/AlexArtaud-Dev/Roomba-V2/blob/main/LICENSE)


## Authors

- [@AlexArtaud-Dev](https://github.com/AlexArtaud-Dev)


## Support

For support, dm me on discord |Alex|#3227.

