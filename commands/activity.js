const Discord = require('discord.js')
const config = require('../config.json');
module.exports = {
  name: "act",
  aliases: ["activity", "level", "rank"],
  execute: async(client, message, args, data, db) => {
    let user = message.guild.members.cache.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || message.author
    
    //if we got an user by name, we must access to the user property 
    if (user.username === undefined) user = user.user

    if(!message.content.startsWith('-'))return;  
    let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)
    if(messagefetch == null) messagefetch = '0';
    if(messagefetch >= '1000') {
    db.add(`coins_${user.id}`, 1)
    data.logs.unshift(`[+1] - Server Activity.`)
    db.set(`logs_${user.id}`, data.logs)
    db.subtract(`messages_${message.guild.id}_${message.author.id}`, 1000) 
    messagefetch = '0'
    };

    messagefetch = messagefetch / 10
   const embed = new Discord.MessageEmbed()
    .setColor("#8a8aff")
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`${user.username}'s Server Activity: **${messagefetch}%**`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription('**What is Server Activity?**\nServer Activity shows how active you are in the server you are in. You will be rewarded accordingly to your activeness.\n**How do I earn through server activity?**\nOnce your activity reaches 100%, you will get [+1] coin as your reward. You can earn upto 10 coins per server per week.')
    .setFooter(config.EmbedFooter)
    message.channel.send(embed) 

  } 
}
