// discord.js documentation: https://discord.js.org/#/docs/main/stable/general/welcome

const botconfig = require ("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
//const dbl = new DBL(config.dblKey, bot);

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {//Fuction loads commands.
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");//Gets jsfiles commands
    if(jsfiles.length <= 0) {
        console.log("No commands to load");
        return;
    }
    console.log(`Loading ${jsfiles.length} commands!`);
    jsfiles.forEach((f, i) =>{//Basically a for loop for each file
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`)
        bot.commands.set(props.help.name, props);//set commands with the name and RUN function
    });
});

/*dbl.on('posted', () => {
    console.log("Updated.")
  });
dbl.on('error', e => {
console.log(`Oops! ${e}`);
});*/

bot.on("ready", function() {
    bot.user.setActivity("r!help");
    console.log("Ready")
    /*setInterval(() => {
        dbl.postStats(bot.guilds.size);
    }, 1800000);*/
});

bot.on('error', console.error);//For discord api errors

bot.on("message", async message => {//Parses message
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");//Splits message into array EX: !stats Jojo => ["!stats", "Jojo"]
    let command = messageArray[0];//Get the first string in message
    let args = messageArray.slice(1);// Just get the argument part of the command EX: ["!stats", "Jojo"] => ["Jojo"]
    if(!command.startsWith(prefix)) return;//If the command string doesnt start with prefix it returns
    let cmd = bot.commands.get(command.slice(prefix.length));//gets the command without prefix EX: !stats => stats
    if(cmd) cmd.run(bot, message, args);//Runs the command object with the command
})

bot.login(botconfig.token);//Login the bot with token