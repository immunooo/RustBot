const discord = require("discord.js");
const updater = require('../classes/Updater');
var moment = require('moment');

module.exports.run = async (bot, message, args) => {
    console.log ("Stats Command: " + message.author.id);
    let steamID = args[0];
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
    if(steamID != ""){
        if(!user.checkData()){
            console.log("     Error with SteamID " + steamID);
            return message.channel.send("Invalid input");
        }
        var stats = user.getStats();
        var s = stats.playerstats;
        var count = 0;
                
        var now = moment();
        var back = moment(stats.playerstats.date)
        var minutes = now.diff(back, 'minutes');
        if (minutes > 120){
            await user.update();
            console.log("     Updated(over 2 hrs) "  + steamID)
            stats = user.getStats();
            s = stats.playerstats;
        }
                
        var name = stats.playerstats.name;
        var avatar = stats.playerstats.avatar;

        var s1 = 0;
        var s2 = 0;
        var s3 = 0;
        var s4 = 0;
        var s5 = 0;
        var s6 = 0;
        var s7 = 0;
        var s8 = 0;
        var s9 = 0;
        var s10 = 0;
        var s11 = 0;
        var s12 = 0;
        var s13 = 0;
        var s14 = 0;
        var s15 = 0;

        while(count < s.stats.length){
            if(s.stats[count].name == "deaths"){
                s1 = s.stats[count].value;
            }
            if(s.stats[count].name == "death_suicide"){
                s2 = s.stats[count].value;
            }
            if(s.stats[count].name == "death_fall"){
                s3 = s.stats[count].value;
            }
            if(s.stats[count].name == "death_selfinflicted"){
                s4 = s.stats[count].value;
            }
            if(s.stats[count].name == "death_entity"){
                s5 = s.stats[count].value;
            }
            if(s.stats[count].name == "death_wolf"){
                s6 = s.stats[count].value;
            }
            if(s.stats[count].name == "death_bear"){
                s7 = s.stats[count].value;
            }
            if(s.stats[count].name == "kill_player"){
                s8 = s.stats[count].value;
            }
            if(s.stats[count].name == "bullet_fired"){
                s9 = s.stats[count].value;
            }
            if(s.stats[count].name == "blueprint_studied"){
                s10 = s.stats[count].value;
            }
            if(s.stats[count].name == "placed_blocks"){
                s11 = s.stats[count].value;
            }
            if(s.stats[count].name == "upgraded_blocks"){
                s12 = s.stats[count].value;
            }
            if(s.stats[count].name == "seconds_speaking"){
                s13 = s.stats[count].value;
            }
            if(s.stats[count].name == "wounded"){
                s14 = s.stats[count].value;
            }
            if(s.stats[count].name == "wounded_assisted"){
                s15 = s.stats[count].value;
            }
                count ++;
            }
            var deaths = s1 - s2 - s3 - s4 - s5 - s6 - s7
            var kd =  s8/deaths;
            kd = kd.toPrecision(3);

            var kdd = s8 / s1;
            kdd = kdd.toPrecision(3); 
            
            s13 = Math.floor(s13);
            var seconds = Math.floor(s13 % 60);
            var minutes = Math.floor((s13 / 60) % 60);
            var hours = Math.floor(s13 / 60 / 60);
            if (seconds < 10){
                seconds = "0" + seconds;
            }
            if (minutes < 10){
                minutes = "0" + minutes;
            }
            if (hours < 10){
                hours = "0" + hours;
            }
            console.log("     Stats Shown for SteamID " + steamID)
            var output = new discord.RichEmbed()
                .setTitle(name + " - Stats")
                .setDescription(steamID)
                .setColor("#ff0000")
                .setThumbnail(avatar)
                .addField("Kills/Deaths", s8 + "/" + s1, true)
                .addField("KDR", kdd, true)
                .addField("Kills/Deaths(PVP)", s8 + "/" + deaths, true)
                .addField("KDR(PVP)", kd, true)
                .addField("Wounded", s14, true)
                .addField("Wounded Assisted", s15, true)
                .addField("Bullets Fired", s9, true)
                .addField("Blue Prints Studied", s10, true)
                .addField("Placed Structures", s11, true)
                .addField("Upgraded Structures", s12, true)
                .addField("Speaking Time", hours+ ":"+ minutes + ":" + seconds, true)
                .setFooter("Note: Bot only shows statistics provided by Steam.");
            return message.channel.send({embed:output});
            
    }
}
module.exports.help = {
    name:"stats"
}