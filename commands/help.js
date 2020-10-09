const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "help",
  aliases: ["help"],
  description: "displays the bot commands list.",
  execute: async(client, message, args, data, db) => {
     const embed = new Discord.MessageEmbed()
    .setColor(`#000000`)
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`${client.user.username} Commands v3.0`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`If you need more help, feel free to ask our support team in the server https://discord.gg/w4hXdRW`)
    .addFields(
      { name: `-help`, value: `Shows the help command. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758695672189812746)`, inline: true},
      { name: `-invite`, value: `Invite the bot to your server. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758695925571911682)`, inline: true},
      { name: `-bal | -balance`, value: `Check your coins balance. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758696355346120705)`, inline: true },
      { name: `-s | -search`, value: `Find some servers to join for coins. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758696916765638707)`, inline: true },
      { name: `-pay`, value: `Pay some coins to other. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758697770512547851)`, inline: true},
      { name: `-check`, value: `Check where you can leave servers. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758698444344262707)`, inline: true},
      { name: `-info | -order`, value: `See your order information. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758698780802416712)`, inline: true},
      { name: `-buy`, value: `To buy users in your server. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758699326452662312)`, inline: true} ,
      { name: `-vote`, value: `Vote and get 1 coin. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758699678379409470)`, inline: true},
      { name: `-giftcode`, value: `To convert your coins into gift code. [Hover Me](https://discordapp.com/channels/746653541115887637/758694523848491108/758700235319934976)`, inline: true}
      )
    .setFooter(config.OwnerID)
    message.channel.send(embed).catch(e => message.channel.send(`I don't have permission to send embed message here!`)) 
  }
}