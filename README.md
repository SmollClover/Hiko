# Hiko

### A Simple Ticket Managing Bot that uses the Thread feature of Discord

> This Bot was designed for personal use. There's no guarantee for it to be stable when used by someone else

---

## Data Structures

<details>
    <summary>Settings</summary>

    ┌──────────┬─────────────────┬────────────────┐
    │  Guild   │  Moderators     │  LogChannelId  |
    ├──────────┼─────────────────┼────────────────┤
    │  String  │  Array<String>  │  String        |
    └──────────┴─────────────────┴────────────────┘

</details>

<details>
    <summary>Channels</summary>

    ┌──────────┬───────────┬──────────┬───────────┬─────────────────┬──────────┐
    │  Guild   │  Channel  │  Number  │  Quote    │  Pings          │  Text    │
    ├──────────┼───────────┼──────────┼───────────┼─────────────────┼──────────┤
    │  String  │  String   │  Number  │  Boolean  │  Array<String>  │  String  │
    └──────────┴───────────┴──────────┴───────────┴─────────────────┴──────────┘

</details>

<details>
    <summary>Tickets</summary>

    ┌──────────┬──────────┬───────────┬──────────┬───────────┬───────────┬─────────────┬────────────┐
    │  Guild   │  Ticket  │  Channel  │  Number  │  Message  │  Creator  │  CreatedAt  │  ClosedAt  │
    ├──────────┼──────────┼───────────┼──────────┼───────────┼───────────┼─────────────┼────────────┤
    │  String  │  String  │  String   │  Number  │  String   │  String   │  Number     │  Number    │
    └──────────┴──────────┴───────────┴──────────┴───────────┴───────────┴─────────────┴────────────┘

</details>

---

## Setup Instructions

> Make sure to have NodeJS installed. I've built this Bot on NodeJS v17.4.0

Create a `.env` file with the following data inside of it

```env
TOKEN=YOUR_DISCORD_BOT_TOKEN
MONGO_URI=YOUR_MONGO_URI
```

Using NVM

```bash
$ nvm install
$ nvm use
```

Yarn

```bash
$ yarn install
$ yarn start
```

NPM

```bash
$ npm install
$ npm start
```

---

## ToDo List

-   [x] MongoDB
    -   [x] Set the Schemas
    -   [x] Define data Structures
-   [x] Use Discord interaction elements
    -   [x] Button Handler
    -   [x] Slashcommand Handler
-   [x] Events
    -   [x] On Message Create
        -   [x] Create Thread on Message
        -   [x] Send Message(Embed) in Thread
            -   [x] Ping Author and configured Roles/Users
            -   [x] Quote Message that was sent by User to create Ticket
            -   [x] Add configured Text
    -   [x] On Button Interaction
        -   [x] Lock and Archive Thread
        -   [x] Send Message who closed Ticket
    -   [x] On Guild Join
        -   [x] Create default Settings in DB
        -   [x] Send Message saying that things need to be configured
    -   [x] On Channel Delete
        -   [x] Delete Ticket Channel data if existed
    -   [ ] On Guild Leave
        -   [ ] Cleanup Database
            -   [ ] Purge Settings
            -   [ ] Purge all Channels
            -   [ ] Purge all Tickets
-   [x] Commands
    -   [x] Add Basic Command Structure
    -   [x] General
        -   [x] Info
    -   [x] Settings
        -   [x] Add Moderator
        -   [x] Remove Moderator
        -   [x] Set Log Channel
    -   [x] Channels
        -   [x] Add Channel to Bot
        -   [x] Remove Channel from Bot
        -   [x] Quote yes or no
        -   [x] Add Ping
        -   [x] Remove Ping
        -   [x] Set Text
        -   [x] Set Ticket Number
-   [x] Permissions
    -   [x] Commands only available as Administrator
-   [x] Logs
    -   [x] Log when Ticket created
    -   [x] Log when Ticket closed and by who
    -   [x] Log when Ticket closed by deleted Message
-   [ ] Other
    -   [ ] Make Roles be addable and not only Users
    -   [ ] Include a Template Invite Link in README, since Bot needs certain Permissions
