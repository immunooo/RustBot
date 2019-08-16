const discord = require("discord.js");
const updater = require('../classes/Updater');
const DataHandler = require('../classes/DataHandler')
var moment = require('moment');
module.exports.run = async (bot, message, args) => {
    console.log ("Resources: " + message.author.id);
    let steamID = args[0];
    /*
    Start of user input handeling
    */
    if (!steamID){
        steamID = message.author.username;
        console.log("     Using discord username as vanity " + steamID)
    }
    var user = new updater(steamID);
    if(isNaN(steamID)){
        if(await user.getVanity()){
            steamID = user.steamID;
            console.log("     Changed vanity to " + steamID)
        }
    }
    if(!user.checkData()){
        if(await user.validateID()){
            await user.update();
            console.log("     Updated " + steamID)
        }
    }
    /*
    end
    */
   if(steamID != ""){
        if(!user.checkData()){
            console.log("     Error with SteamID " + steamID);
            return message.channel.send("Invalid input, make sure you have a SteamID 64 and the accounts game details is set to public.");
        }
        var stats = user.getStats();
        var name = stats.playerstats.name;
        var avatar = stats.playerstats.avatar;
        var now = moment();
        var back = moment(stats.playerstats.date)
        var minutes = now.diff(back, 'minutes');
        if (minutes > 120){//If stats say they were 2 hours ago it updates
            await user.update();
            console.log("     Updated(over 2 hrs) "  + steamID)
        }
        var data = new DataHandler(["kill_player", "kill_bear", "kill_boar", "kill_stag", "kill_chicken", "kill_horse",  "kill_wolf"],steamID);
        data.parseStats();
        var collectedData = data.getData();
        var total = collectedData[0] + collectedData[1] + collectedData[2] + collectedData[3] + collectedData[4] + collectedData[5] + collectedData[6];
        console.log("     Stats Shown for SteamID " + steamID)
        var output = new discord.RichEmbed()
            .setTitle(name + " - Kills")
            .setDescription(args)
            .setColor("#ff0000")
            .setThumbnail(avatar)
            .addField("Total Kills", total, true)
            .addField("Player Kills", collectedData[0], true)
            .addField("Bear Kills", collectedData[1], true)
            .addField("Wolf Kills", collectedData[6], true)
            .addField("Boar Kills", collectedData[2], true)
            .addField("Deer Kills", collectedData[3], true)
            .addField("Horse Kills", collectedData[5], true)
            .addField("Chicken Kills", collectedData[4], true)
            .setFooter("Note: Bot only shows statistics provided by Steam. | Animal kills might not show up for some accounts.");
        return message.channel.send({embed:output});
    }   
}
module.exports.help = {
    name:"kills"
}