const { Command } = require("../mystia-lib/dist/index.js");

class Ping extends Command {
    constructor() {
        super({
            name: "ping",
            description: "Pong!",
            aliases: ["pg", "pong"]
        })
    }
    /**
     * @param {import("../mystia-lib/dist").CommandContext} data 
     */
    async execute(data) {
        data.message.reply("Pong!");
    }
}

module.exports = Ping;