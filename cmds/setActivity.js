module.exports.run = async (bot, message, args) => {
    if(message.author.id != 247111029912240128) return;
    var temp = "";
    for(var i = 0; i < args.length; i++){
        temp += args[i];
    }
    console.log("Set the activity to: \"" + temp + "\"")
    return bot.user.setActivity(temp);

}
module.exports.help = {
    name:"setactivity"
}