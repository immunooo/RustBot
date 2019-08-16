const fetch = require('node-fetch');
const key = require('../config.json')
const discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    var output = new discord.RichEmbed()
        .setAuthor("Command List", bot.user.avatarURL)
        .setColor("#ff0000")
        .addField("Links", "[Support Server](https://discord.gg/U6NjBcW) | [invite](https://discordapp.com/oauth2/authorize?client_id=478811809235861504&scope=bot&permissions=19456) | [Upvote](https://discordbots.org/bot/478811809235861504)")
        .addField("Stat Commands", "`accuracy` `deaths` `kills` `resources` `stats`")
        .addField("Server Stats Commands", "`info` `serverlist`")
        .addField("Other Rust Commands", "`craft` `cp`")
        .addField("Info", "`botinfo` `help`")
    return message.channel.send({embed:output});
}
module.exports.help = {
    name:"help"
}