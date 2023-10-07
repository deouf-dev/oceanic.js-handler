const { Client, Collection } = require("oceanic.js"),
    { readdirSync } = require("fs");

class MyClient extends Client {
    constructor() {
        super({ auth: `Bot ${process.env.TOKEN}`, gateway: { intents: 3276799 } }) // All intents

        this.commands = new Collection();
        this.start();
    }
    start() {
        this.loadCommands();
        this.loadEvents();
        this.connect();
    }
    loadCommands() {
        for (const dir of readdirSync("./src/commands")) {
            for (const file of readdirSync(`./src/commands/${dir}`)) {
                const command = require(`../commands/${dir}/${file}`);
                this.commands.set(command.name, command);
                delete require.cache[require.resolve(`../commands/${dir}/${file}`)]
            }
        }
    }
    loadEvents() {
        for (const dir of readdirSync("./src/events")) {
            for (const file of readdirSync(`./src/events/${dir}`)) {
                const event = require(`../events/${dir}/${file}`);
                this.on(event.name, (...args) => event.run(this, ...args));
                delete require.cache[require.resolve(`../events/${dir}/${file}`)]
            }
        }
    }
    initCommands() {
        this.application.bulkEditGlobalCommands(this.commands.toArray())
    }
}

exports.MyClient = MyClient;