const discord = require("discord.js");
const db = require("./helpers/dbcheck");
const embed = require("./helpers/embedgen");
require("dotenv").config();

const client = new discord.Client();

const prefix = ".pc ";
client.commands = new discord.Collection();

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const itemName = message.content.slice(prefix.length).toLowerCase();

  const itemSearched = await db.checkDatabase(itemName);
  console.log(itemSearched);
  console.log("Generating embed...");

  if (itemSearched == null) {
    message.channel.send(
      "No item was found by that name! The item may be untradeable or you may have made a typo."
    );
  } else if (itemSearched[0] == undefined) {
    message.channel.send(embed.genEmbed(itemSearched, null));
  } else {
    message.channel.send(embed.genEmbed(itemSearched[1], itemSearched[0][0]));
  }
  console.log("Message sent to discord.");
});

// To put in separate JSON. Always comes last.
client.login(process.env.TOKEN);
