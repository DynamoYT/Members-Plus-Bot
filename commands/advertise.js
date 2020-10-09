const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: "advertise",
  aliases: ["buy"],
  description: "used to advertise your server and get members on your Server.",
  execute: async(client, message, args, data, db) => {

    let amount = Number(args[0])

    const description = args.slice(1).join(" ")
    let needatleastcoins = new Discord.MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`<@${message.author.id}> You need at least **5** coins to buy users in your server.`)
    .setColor("RED")
    .setFooter(config.EmbedFooter)
    //.setImage('https://cdn.discordapp.com/attachments/752426116530307123/752804441064734750/youcantbuy.gif')
    if(amount < 5) return message.channel.send(needatleastcoins)
    if (data.coins < 5) return message.channel.send(needatleastcoins)
    let incorrectcommand = new Discord.MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`<@${message.author.id}> BRUH. This command is incorrect. In order to buy users in your server, do \`-buy <NumberOfCoins> <Description>\` \nNote: No need to put \`<>\``)

    if (!amount || isNaN(amount) || amount < 1) return message.channel.send(`Commanding incorrect!\nIn order to buy users for your server do \`-buy <numberOfCoins> <description>\` [1 coin = 1 user]`)

    if (amount > data.coins) return message.channel.send(`${message.author.username} you don't have enough coins to buy users in your server.\n`)

    amount = Math.round(amount)

    let link = data.code

    if (link == 0) {
      link = await message.channel.createInvite({ maxAge: 0 })

      link = link.code
    }

    await client.fetchInvite('https://discord.gg/' + link).catch(async x => {
      link = await message.channel.createInvite({ maxAge: 0 })
      link = link.code
      console.log(link)
    })

    if (description && description.includes("discord.gg")) return message.channel.send(`Unfortunately I don't accept invite links in description. Remove them please!`)
    if (description && description.includes("https://", "http://")) return message.channel.send(`I don't accept Website and Server links`)
    if (description && description.length > 100) return message.channel.send(`The message exceed the limit of 100 words`)
    


    await new Promise(resolve => setTimeout(resolve, 100))

    db.set(`code_${message.guild.id}`, link)

    data.logs.unshift(`[-${amount}] - Advertise ${message.guild.name}(${message.guild.id}) server.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.set(`description_${message.guild.id}`, `${description === undefined ? "" : description}\nhttps://discord.gg/${link}`)

    db.add(`orders_${message.guild.id}`, amount)

    db.subtract(`coins_${message.author.id}`, amount)
    
    let successembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`Server Orders`)
    //.setImage(`https://cdn.discordapp.com/attachments/746240324757618749/751801321358753892/usersbought.gif`)
    .setDescription(`[<@${message.author.id}>] You have successfully bought users for your server.`)
    .addFields([
      {name: "Amount Paid", value: `**${amount}** coins`},
      {name: "You will get", value: `**${amount}** users`},
      {name: "-info | -orders", value: `Check current orders of **${client.guilds.cache.get(message.guild.id).name}**`}
    ])
    .setFooter(config.EmbedFooter)
    message.channel.send(successembed)
    /*
    let logchannel = client.channels.cache.get('746439017738010735')
    let embed = new Discord.MessageEmbed()
    .setTitle('User made Orders')
    .setColor("YELLOW")
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/w4hXdRW`)
    .addField(`Server name:`, `${message.guild.name}`, false)
    .addField(`Server Id:`, `${message.guild.id}`, false)
    .addField(`Amount of Orders`, `${Number(args[0])}`, false)
    .addField(`Description`, `${description}`, false)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    logchannel.send(embed)
    */
  }
}