const fetch = require('node-fetch');
const key = require('../config.json')
const discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    var members = 0;
        bot.guilds.forEach((guild) => {
            if(guild.name != "Discord Bot List"){
                members += guild.memberCount;
                
            }
        });
        var output = new discord.RichEmbed()
                .setTitle("Bot Information - RustBot")
                .setColor("#ff0000")
                .setThumbnail("https://ih0.redbubble.net/image.346295871.1819/flat,550x550,075,f.jpg")
                .addField("Owner", "Jojo#8710", true)
                .addField("Date of Creation", "Oct 24, 2018", true)
                .addField("Default Prefix", "r!", true)
                .addField("Ping", Math.floor(bot.ping), true)
                .addField("Servers",bot.guilds.size, true)
                .addField("Members", members, true)
                .addField("Progamming Language", "Javascript", true)
                .addField("Library", "discord.js", true)
                .addField("APIs Used", "[Steam](https://store.steampowered.com/)\n[BattleMetrics](https://www.battlemetrics.com/)")
                .addField("Links", "[Support Server](https://discord.gg/U6NjBcW) | [invite](https://discordapp.com/oauth2/authorize?client_id=478811809235861504&scope=bot&permissions=19456) | [Upvote](https://discordbots.org/bot/478811809235861504)")
                .setTimestamp();
            return message.channel.send({embed:output});
}
module.exports.help = {
    name:"botinfo"
}