# Hiko

### A Simple Ticket Managing Bot that uses the Thread feature of Discord

> This Bot was designed for personal use. There's no guarantee for it to be stable when used by someone else

---

## ToDo List

-   [ ] MongoDB
    -   [x] Set the Schemas
    -   [x] Define data Structures
-   [ ] Use Discord interaction elements
    -   [ ] Button to close Ticket
    -   [x] Slash Commands
-   [ ] On Message Create Event
    -   [ ] Create Thread on Message
    -   [ ] Send Message(Embed) in Thread
        -   [ ] Ping Author and configured Roles/Users
        -   [ ] Quote Message that was sent by User to create Ticket
        -   [ ] Add configured Text
-   [ ] On Button Interaction Event
    -   [ ] Lock and or Archive Thread based on configuration
-   [ ] Logging System
    -   [ ] Have a Log Channel with everything that happened
    -   [ ] Disabled by default
-   [ ] GitHub Repository
    -   [ ] Make Setup Instructions better
    -   [ ] Add a FAQ Section

---

## Data Structures

<details>
    <summary>Settings</summary>

    ┌──────────┬─────────────────┐
    │  guild   │  moderators     │
    ├──────────┼─────────────────┤
    │  Number  │  Array<Number>  │
    └──────────┴─────────────────┘

</details>

<details>
    <summary>Channels</summary>

    ┌──────────┬───────────┬───────────┬─────────────────┬──────────┐
    │  guild   │  channel  │  quote    │  pings          │  text    │
    ├──────────┼───────────┼───────────┼─────────────────┼──────────┤
    │  Number  │  Number   │  Boolean  │  Array<Number>  │  String  │
    └──────────┴───────────┴───────────┴─────────────────┴──────────┘

</details>

<details>
    <summary>Tickets</summary>

    ┌──────────┬───────────┬──────────┬───────────┬───────────┬─────────────┬────────────┐
    │  guild   │  channel  │  number  │  message  │  creator  │  createdAt  │  closedAt  │
    ├──────────┼───────────┼──────────┼───────────┼───────────┼─────────────┼────────────┤
    │  Number  │  Number   │  Number  │  String   │  Number   │  Number     │  Number    │
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