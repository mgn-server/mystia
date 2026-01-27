require('dotenv').config();

const { WSClient, Intents } = require('./mystia-lib/dist/index');
const client = new WSClient(process.env.TOKEN, Intents.ALL);

client.on("ready", console.log);
client.on("messageCreate", async (message) => {
    if(message.author.bot) return;
    const msg = await client.api.sendMessage(message.channel_id, { content: "Olá!" });
    console.log(msg);
})
client.run();