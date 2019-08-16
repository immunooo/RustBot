const discord = require("discord.js");
const updater = require('../classes/Updater');
const DataHandler = require('../classes/DataHandler')
var moment = require('moment');

module.exports.run = async (bot, message, args) => {
    console.log ("Stats Command: " + message.author.id);
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
        /*
        Creates DataHandler object and does math with given stats
        */
        var data = new DataHandler(["deaths", "death_suicide", "death_fall", "death_selfinflicted", "death_entity", "death_wolf", "death_bear", "kill_player", "bullet_fired", "blueprint_studied", "placed_blocks", "upgraded_blocks", "seconds_speaking", "wounded", "wounded_assisted"],steamID);
        data.parseStats();
        var collectedData = data.getData();

        var deaths = collectedData[0] - collectedData[1] - collectedData[2] - collectedData[3] - collectedData[4] - collectedData[5] - collectedData[6]
        var kd =  collectedData[7] / deaths;
        kd = kd.toPrecision(3);

        var kdd = collectedData[7] / collectedData[0];
        kdd = kdd.toPrecision(3); 

        collectedData[12] = Math.floor(collectedData[12]);
        var seconds = Math.floor(collectedData[12] % 60);
        var minutes = Math.floor((collectedData[12] / 60) % 60);
        var hours = Math.floor(collectedData[12] / 60 / 60);
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        if (hours < 10){
            hours = "0" + hours;
        }

        /*
        Builds the embedded link
        */
        console.log("     Stats Shown for SteamID " + steamID)
        var output = new discord.RichEmbed()
            .setTitle(name + " - Stats")
            .setDescription(steamID)
            .setColor("#ff0000")
            .setThumbnail(avatar)
            .addField("Kills/Deaths", collectedData[7] + "/" + collectedData[0], true)
            .addField("KDR", kdd, true)
            .addField("Kills/Deaths(PVP)", collectedData[7] + "/" + deaths, true)
            .addField("KDR(PVP)", kd, true)
            .addField("Wounded", collectedData[13], true)
            .addField("Wounded Assisted", collectedData[14], true)
            .addField("Bullets Fired", collectedData[8], true)
            .addField("Blue Prints Studied", collectedData[9], true)
            .addField("Placed Structures", collectedData[10], true)
            .addField("Upgraded Structures", collectedData[11], true)
            .addField("Speaking Time", hours+ ":"+ minutes + ":" + seconds, true)
            .setFooter("Note: Bot only shows statistics provided by Steam.");
        return message.channel.send({embed:output});

    }
}
module.exports.help = {
    name:"stats"
}