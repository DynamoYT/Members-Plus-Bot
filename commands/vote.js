const Discord = require('discord.js');
const { get } = require('../constructors/sqlite.js');
const config = require('../config.json');
module.exports = {
  name: "vote",
  execute: async(client, message, args, data, db) => {
    const embed = new Discord.MessageEmbed()
    .setColor("#8a8aff")
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setTitle(`Vote Users+ in top.gg!`)
    .setThumbnail(client.user.displayAvatarURL) 
   .setDescription('Vote and get 1 Coin \n**[Click to vote the bot!](https://top.gg/bot/728099900176334900/vote)**')

    .setFooter(config.EmbedFooter)
    message.channel.send(embed) 

  } 
}
