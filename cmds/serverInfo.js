const BmApi = require('../classes/BattlemetricsApi')
const serverList = require('../userData/otherData/serverList.json')
const discord = require('discord.js');
var moment = require('moment');
module.exports.run = async (bot, message, args) => {
    var api = new BmApi();
    var serverid = "";
    var parameters = [];
    var input = "";
    var count = 0;

    while(count < args.length){
        if(!args[count].startsWith("-")){
            input +=  " " + args[count];
        } else {
            parameters.push(args[count]);
        }
        count++;
    }
    input = input.substring(1, input.length)
    count  = 0;
    while(count < serverList.list.length){
       if(serverList.list[count].name.toLowerCase() == input.toLowerCase()){
            serverid = serverList.list[count].id;
        }
        count++;
    }
    var response = await api.getServerStats(serverid);
    console.log(response)
    var accessable;
    try{
        var f = response.data["attributes"].id
        accessable = true;
    } catch(e){
        accessable = false;
    }
    console.log(accessable)
    if(accessable){
        var n = response.data["attributes"];
        var date = moment(n.details["rust_last_wipe"]).format("MM-DD-YYYY");
        if(parameters.length > 0){
            var output = new discord.RichEmbed()
                .setTitle("__" + n.name + "__")
                .setColor("#ff0000")
                .setFooter("Server information brought to you by BattleMetrics.");
            for(var i = 0; i < parameters.length; i++){
                if(parameters[i].toLowerCase() == "-pop"){
                    output.addField("Players", n.players + "/" + n.maxPlayers)
                }
                if(parameters[i].toLowerCase() == "-queue"){
                    output.addField("Queue", n.details["rust_queued_players"])
                }
                if(parameters[i].toLowerCase() == "-website"){
                    output.addField("Website", "<" + n.details["rust_url"] + ">")
                }
                if(parameters[i].toLowerCase() == "-lastwipe"){
                    output.addField("Last Wiped", date)
                }
            }
            return message.channel.send({embed:output});

        } else {
            var output = new discord.RichEmbed()
                .setTitle("__" + n.name + "__")
                .setDescription(n.details["rust_description"])
                .setColor("#ff0000")
                .addField("Players", n.players + "/" + n.maxPlayers)
                .addField("Queue", n.details["rust_queued_players"])
                .addField("Website", "<" + n.details["rust_url"] + ">")
                .addField("Last Wiped", date)
                .setFooter("Server information brought to you by BattleMetrics.");
            return message.channel.send({embed:output});
        }
    } else {
        if(input != ""){
            var result = [];
            var index;
            var entry;
                
            for(index = 0; index < serverList.list.length; index++){
                entry = serverList.list[index];
                if(entry && entry.name && entry.name.toLowerCase().indexOf(args) != -1 && result.length < 7){
                    result.push(entry.name + "\n");
                }
            }
            //End of search
            result = result.toString();
            result = result.replace(/,/g,'');
            if(result != ""){
                var output = new discord.RichEmbed()
                    .setTitle("__Servers that close to your input__")
                    .setDescription(result)
                    .setColor("#ff0000")
                return message.channel.send({embed:output});
            } else {
                return message.channel.send("There are no servers on the list similar to your entry. Use **r!serverlist** for a list of servers.");
            }
        } else {
            return message.channel.send("Please have a server name.")
        }
    }
}
module.exports.help = {
    name:"info"
}