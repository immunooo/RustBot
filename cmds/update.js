const discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    var output = new discord.RichEmbed()
        .setColor("#ff0000")
        .setTitle("RustBot Updates")
        .setDescription("Date: 4-16-2019")
        .setThumbnail("https://ih0.redbubble.net/image.346295871.1819/flat,550x550,075,f.jpg")
        .addField("Update:", "Hello Rust Bot users! Sorry I have not been able to provide updates. The bot has been rewritten to be faster and some commands got removed or changed. If you have any questions or to report a bug please join the [Support Server](https://discord.gg/U6NjBcW).")
        .addField("Change List:", "__Added:__\n- Admin tools for the bot\n__Changes:__\n- changed r!info command to include parameters after server name including: -pop -queue -website -lastwipe\n- Use of discord username instead of default command\n__Removed:__\n- (temporarily) removed r!wipestats and r!record commands\n- removed default, prefix, ping commands")
        .addField("Final Note", "If you want to help develop commands or have any suggestions or ideas for this bot message me @Jojo#8710. More commands are comming soon. Thank you for all for your patience :)")
        .setFooter("Type r!help to view all commands");
        message.channel.send({embed:output});

}
module.exports.help = {
    name:"update"
}