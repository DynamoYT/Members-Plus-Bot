const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "search",
  description: "displays 3 servers to join in and gain coins.",
  aliases: ["s", "f", "find"],
  execute: async(client, message, args, data, db) => {
   
    let orders = await db.startsWith(`orders_`, { sort: ".data" })
    
    let length = 2
    
    orders = orders.filter(x => x.data > 0 && client.guilds.cache.get(x.ID.split("_")[1]) && client.guilds.cache.get(x.ID.split("_")[1]).members.cache.get(message.author.id) === undefined)
    
    const embed = new Discord.MessageEmbed()
    .setColor("#8a8aff")
    .setAuthor('Users+', client.user.displayAvatarURL())
    .setTitle(`SERVER FINDER FOR COINS`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setDescription(`<@${message.author.id}> Join the server below to earn 1 coin. You can buy coins if you don't want to join servers!\n\n**__Servers to join for coins__**`)
       for (let i = 0;i < orders.length;i++) {
     
         let handler = true
         
      	if (length > 4) {} else {
 
        	let id = orders[i].ID.split("_")[1]
        
        	let guild = client.guilds.cache.get(orders[i].ID.split("_")[1]).name
        
       	  let code = await db.fetch(`code_${id}`)
        
          
       		await client.fetchInvite("https://discord.gg/" + code)
          .then(link => { 
           // console.log(link.code)
            if (link.code === null) handler = false 
          })
          .catch(error => {
            handler = false 
          }) 
          
          await new Promise(resolve => setTimeout(resolve, 1))
          
        	if (handler) {
        		let description = await db.fetch(`description_${id}`)
        		embed.addField(`**${guild}**`, description, false)
       			length++
        } 
      } 
    } 
 
    embed.addField(`**__Users+ Support Server__**`, `https://discord.gg/w4hXdRW`, false)
    
    embed.addField(`There is no link available ?`, `That means there is no server available for you to join!, Try after 2 minutes.`, false)
    .setFooter(config.EmbedFooter)
    message.channel.send(embed)  
  } 
}