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
        var data = new DataHandler(["bullet_fired", "bullet_hit_player",  "bullet_hit_entity", "bullet_hit_building", "bullet_hit_bear", "bullet_hit_stag", "bullet_hit_wolf",  "bullet_hit_boar", "bullet_hit_sign", "bullet_hit_playercorpse", "bullet_hit_corpse",  "shotgun_fired", "shotgun_hit_building", "shotgun_hit_player", "shotgun_hit_horse", "shotgun_hit_entity", "arrow_fired", "arrow_hit_entity", "arrow_hit_building", "arrow_hit_boar", "arrow_hit_bear",  "arrow_hit_wolf", "arrow_hit_stag", "arrow_hit_chicken", "arrow_hit_horse",  "arrow_hit_player", "arrows_shot", "headshot"],steamID);
        data.parseStats();
        var collectedData = data.getData();
        /*
        Bullets: 0-10
        Shotgun: 11-15
        Arrow: 16-26
        Headshots: 27
        */
        var totalRifle = collectedData[1] + collectedData[4] + collectedData[5] + collectedData[6] + collectedData[7];
        var totalArrow = collectedData[19] + collectedData[20] + collectedData[21] + collectedData[22] + collectedData[23] + collectedData[24] + collectedData[25];
        var pvpArrow = collectedData[16] - (collectedData[19] + collectedData[20] + collectedData[21] + collectedData[22] + collectedData[23] + collectedData[24]);
        var pvpRifle = collectedData[0] - (collectedData[4] + collectedData[5] + collectedData[6] + collectedData[7] + collectedData[8] + collectedData[9] + collectedData[10])
        var hsp = collectedData[27] / (collectedData[1] + collectedData[13] + collectedData[25])
        console.log("     Stats Shown for SteamID " + steamID)
        var output = new discord.RichEmbed()
            .setTitle(name + " - Accuracy")
            .setDescription(args)
            .setColor("#ff0000")
            .setThumbnail(avatar)
            .addField("Rifle Accuracy", ((totalRifle / collectedData[0])*100).toPrecision(4) + "%", true)
            .addField("Bow Accuracy", ((totalArrow / collectedData[16]) * 100).toPrecision(4) + "%" , true)
            .addField("Rifle Accuracy(PVP)", ((collectedData[1] / pvpRifle)*100).toPrecision(4) + "%", true)
            .addField("Bow Accuracy(PVP)", ((collectedData[25] / pvpArrow)*100).toPrecision(4) + "%", true)
            .addField("Headshots", (collectedData[27] /(collectedData[1] + collectedData[13] + collectedData[25]) * 100).toPrecision(4) + "%" , true)
            .setFooter("Note: Bot only shows statistics provided by Steam.");
        return message.channel.send({embed:output});
    }
}
module.exports.help = {
    name:"accuracy"
}