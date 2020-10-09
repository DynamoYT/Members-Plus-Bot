const Discord = require('discord.js');
const { RichEmbed } = require("discord.js");
const config = require('../config.json');
module.exports = {
  name: "invite",
  aliases: ["inv", "link", "invites", "invs"],
  description: "Invite Users+ in your server.",
  execute: async(client, message, args, data, db) => {
   
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setThumbnail(client.user.avatarURL())
    .addField('INVITE THE BOT TO YOUR SERVER ',`Invite the bot using this link:  https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)    
    .setFooter(config.EmbedFooter)
    .setColor("#8a8aff")
    //.setImage('https://i.gyazo.com/a65915aa5e7aa181d34d85bea1818be4.png')
    message.channel.send(embed)
      
    
  } 
}