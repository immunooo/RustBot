const fs = require('fs');
const config = require('../config.json');
const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    console.log ("Group: " + message.author.id);
    var file = fs.readFileSync(config.path + '/userData/otherData/groups.json', 'utf8');
    var groupList = JSON.parse(file);
    var group = "null";
    var index;
    groupList.groups.forEach((f, i) => {
        if(f.discordServerId == message.guild.id){
            group = groupList.groups[i];
            index = i;
        }
    });
    if(group == "null" && message.guild.ownerID == message.author.id){
        groupList.groups.push({"discordServerId":message.guild.id, "members":[]});
        fs.writeFileSync(config.path + '/userData/otherData/groups.json', JSON.stringify(groupList), function (err){
            if (err) throw err;
        });
        console.log('   Added guild ' + message.guild.id + ' to the groups list!');
        file = fs.readFileSync(config.path + '/userData/otherData/groups.json', 'utf8');
        groupList = JSON.parse(file);
        group = groupList.groups[groupList.groups.length - 1];
        return message.channel.send("A group has been created for this server!");
    }

    if(args.length != 0 && message.guild.ownerID == message.author.id && group != "null"){
            var userlist = message.mentions.users;
            var list = [];
            userlist.forEach(function(user){
                list.push(user.id)
                list.push(user.username)
            })
            var tempArgs = args[0].split(" ")
            console.log(tempArgs)
            args[0] = tempArgs[0]
            console.log(list + " " + args[0])
            if(args[0] == "add"){
                var steamID = "";
                if(args.length >= 3){
                    steamID = args[2];
                }
                groupList.groups[index].members.push({"discordID":list[0], "userName":list[1], "steamID":steamID, "leader":false});
                fs.writeFileSync(config.path + '/userData/otherData/groups.json', JSON.stringify(groupList), function (err){
                    if (err) throw err;
                });

            } else if(args[0] == "addleader"){
                var steamID = "";
                if(args.length >= 3){
                    steamID = args[2];
                }
                groupList.groups[index].members.push({"discordID":list[0], "userName":list[1], "steamID":steamID, "leader":true});
                fs.writeFileSync(config.path + '/userData/otherData/groups.json', JSON.stringify(groupList), function (err){
                    if (err) throw err;
                });
                return message.channel.send("Added the leader " + list[1] + " to the group!")

            } else if(args[0] == "remove"){
                var temp = [];
                groupList.groups[index].members.forEach(i => {
                    if(i.userName != args[1] && i.leader == true){
                        temp.push({"discordID":i.discordID, "userName":i.userName, "steamID":i.steamID, "leader":true})
                    } else if(i.userName != args[1]){
                        temp.push({"discordID":i.discordID, "userName":i.userName, "steamID":i.steamID, "leader":false})
                    }
                    return message.channel.send("Added " + list[1] + " to the group!")
                })
                groupList.groups[index].members = temp;
                fs.writeFileSync(config.path + '/userData/otherData/groups.json', JSON.stringify(groupList), function (err){
                    if (err) throw err;
                });
                return message.channel.send("Removed " + args[1] + " from the group!")
            } else {
                return message.channel.send("Incorrect input for command. r!groups add , r!groups addleader, r!groups remove")
            }
        /*} catch(e){
            return message.channel.send("There was a problem with your syntax.")
        }*/
    } else {
        if(group != "null" ){
            var output = new discord.RichEmbed()
            .setColor("#ff0000")
            .setTitle(message.guild.name + " Group Members")
            .addField("Leader" , " null")
        } else {
            return message.channel.send("There is no group for this server. If you want to make one ask the owner of the server to type r!groups")
        }
    }
}
module.exports.help = {
    name:"group"
}