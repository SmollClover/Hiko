# Hiko

### A Simple Ticket Managing Bot that uses the Thread feature of Discord

> This Bot was designed for personal use. There's no guarantee for it to be stable when used by someone else

---

## Setup Instructions

> Make sure to have NodeJS installed. I've built this Bot on NodeJS v18.1.0

Create a `.env` file in the project root directory with the following data inside of it

```env
TOKEN=YOUR_DISCORD_BOT_TOKEN
MONGO_URI=YOUR_MONGO_URI
```

### Using NVM

```bash
$ nvm install
$ nvm use
```

### Yarn

```bash
$ yarn install
$ yarn start
```

### NPM

```bash
$ npm install
$ npm start
```

### Scopes

-   bot
-   applications.commands

### Permission

-   Read Messages
-   Send Messages
-   Send Messages in Thread
-   Create Public Thread
-   Create Private Thread
-   Manage Messages
-   Manage Threads
-   Embed Links
-   Read Message History
-   Mention @everyone, @here and All Roles
-   Add Reactions
-   Use External Emojis
-   Use External Stickers

### Template Invite Link

`https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_CLIENT_ID&permissions=532576431168&scope=applications.commands%20bot`
