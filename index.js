require('dotenv').config();

const path = require('node:path');
const { Client, Intents, VoiceConnection, VoiceConnectionManager, setupCommandHandler, delay } = require('./mystia-lib/dist/index');
const client = new Client({
    token: process.env.TOKEN,
    intents: Intents.ALL,
    prefix: "m!"
});
async function initBot() {
    const { handler, loader } = await setupCommandHandler(client, {
        commandsPath: path.join(__dirname, "commands"),
        ownerIds: ["YOUR_USER_ID"],
    });

    client.on("ready", async (data) => {
        console.log(data);
    });
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        const parsed = handler.parseMessage(message);
        if(!parsed.isCommand) return;
        if(!parsed.command) {
             const msg = await message.reply("Este comando não existe.");
             await delay(2000);
             msg.delete();
             return;
        }
        
        await parsed.command.execute({
            message,
            args: parsed.args,
            client,
            commandName: parsed.command.name
        })
        // console.log(msg);
    })
    client.on("debug", console.info);

    client.on("messageUpdate", console.log)
    client.run();
}
initBot();
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);