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
        var data = new DataHandler(["harvest.wood", "harvest.stones", "acquired_metal.ore", "harvest.cloth", "harvested_leather", "acquired_lowgradefuel",  "acquired_scrap"],steamID);
        data.parseStats();
        var collectedData = data.getData();
        console.log("     Stats Shown for SteamID " + steamID)
        var output = new discord.RichEmbed()
                .setTitle(name + " - Resources")
                .setDescription(args)
                .setColor("#ff0000")
                .setThumbnail(avatar)
                .addField("Wood", collectedData[0], true)
                .addField("Stone", collectedData[1], true)
                .addField("Metal Ore", collectedData[2], true)
                .addField("Cloth", collectedData[3], true)
                .addField("Leather", collectedData[4], true)
                .addField("Low Grade Fuel", collectedData[5], true)
                .addField("Scrap", collectedData[6], true)
                .setFooter("Note: Bot only shows statistics provided by Steam.");
        return message.channel.send({embed:output});
    }
}
module.exports.help = {
    name:"resources"
}