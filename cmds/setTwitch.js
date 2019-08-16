module.exports.run = async (bot, message, args) => {
    if(message.author.id != 247111029912240128) return;
    var title = "";
    var link = "";
    var index = 0;
    while(args[index] != "link:"){
        title += args[index] + " ";
        index++;
    }
    link = args[args.length - 1]
    console.log("Set the activity(twitch) to: \"" + title + "\"" + " Link: " + link);
    return bot.user.setActivity(title, {url: link});

}
module.exports.help = {
    name:"settwitch"
}