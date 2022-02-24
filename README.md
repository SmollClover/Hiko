# Hiko

### A Simple Ticket Managing Bot that uses the Thread feature of Discord

> This Bot was designed for personal use. There's no guarantee for it to be stable when used by someone else

---

## ToDo List

-   [ ] MongoDB
    -   [x] Set the Schemas
    -   [x] Define data Structures
-   [ ] Use Discord interaction elements
    -   [x] Button Handler
    -   [x] Slashcommand Handler
-   [ ] On Message Create Event
    -   [ ] Create Thread on Message
    -   [ ] Send Message(Embed) in Thread
        -   [ ] Ping Author and configured Roles/Users
        -   [ ] Quote Message that was sent by User to create Ticket
        -   [ ] Add configured Text
-   [ ] On Button Interaction Event
    -   [ ] Lock and Archive Thread based on configuration
-   [ ] On Guild Join Event
    -   [x] Create default Settings in DB
    -   [x] Send Message saying that things need to be configured
-   [ ] Commands
    -   [x] Add Basic Command Structure
    -   [ ] General
        -   [ ] Info
    -   [x] Settings
        -   [x] Add Moderator
        -   [x] Remove Moderator
        -   [x] Set Log Channel
    -   [ ] Channels
        -   [ ] Add Channel to Bot
        -   [ ] Remove Channel from Bot
        -   [ ] Quote yes or no
        -   [ ] Add Ping
        -   [ ] Remove Ping
        -   [ ] Set Text
        -   [ ] Set Ticket Number
-   [ ] Logging System
    -   [ ] Have a Log Channel with everything that happened
    -   [ ] Disabled by default
-   [ ] GitHub Repository
    -   [ ] Make Setup Instructions better
    -   [ ] Add a FAQ Section (if needed)

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

    ┌──────────┬───────────┬──────────┬───────────┬───────────┬─────────────┬────────────┐
    │  Guild   │  Channel  │  Number  │  Message  │  Creator  │  CreatedAt  │  ClosedAt  │
    ├──────────┼───────────┼──────────┼───────────┼───────────┼─────────────┼────────────┤
    │  String  │  String   │  Number  │  String   │  String   │  Number     │  Number    │
    └──────────┴───────────┴──────────┴───────────┴───────────┴─────────────┴────────────┘

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
