const fetch = require('node-fetch');
const discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    var response = await fetch('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?format=json&appid=252490');
    var summary = await response.json();
    var response = summary.response["player_count"];
    var output = new discord.RichEmbed()
        .setColor("#ff0000")
        .setTitle("There are currently __" + response + "__ players on Rust.")
    return message.channel.send({embed:output});
}
module.exports.help = {
    name:"cp"
}