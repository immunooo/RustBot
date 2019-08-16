const SteamApi = require('./SteamApi.js');
const config = require('../config.json');
var moment = require('moment');
var fs = require('fs');
class Updater {
    constructor(steamID){
        this.steamID = steamID;
        this.steam = new SteamApi(steamID);
    }
    /*
    Returns true if able to access Rust Stats
    */
    async validateID(){
        try{
            var n = await this.steam.getStats();
            n = n.summary;
            return true;
        } catch(e){
            return false;
        }
    }
    /*
    Updates file in user data with current steam id
    */
    async update(){
        var summary = await this.steam.getSummary();
        var date = moment();
        var name = summary.response.players[0].personaname;
        var avatar = summary.response.players[0].avatarfull;
        if(await this.validateID()){
            var n = await this.steam.getStats();
            n.playerstats.date = date;
            n.playerstats.name = name;
            n.playerstats.avatar = avatar;
            n = JSON.stringify(n);
            fs.writeFileSync(config.path + '/userData/savedData/'+ this.steamID + ".json", n, function (err){
                if (err) throw err;
                console.log('     Updated!');
            });
        }
        
    }

    /*
    Checks to see if data exists as a file
    */
    checkData(){
        try{
            var file = require(config.path + '/userData/savedData/' + this.steamID + '.json');
            return true;
        } catch(e){
            return false;
        }
    }
    /*
    Gets stats from file and returns them
    */
    getStats(){
        var file = fs.readFileSync(config.path + '/userData/savedData/' + this.steamID + '.json', 'utf8');
        return JSON.parse(file);

    }
    /*
    Returns true vanity is present and updates constuctor steamID variable with steamID
    */
    async getVanity(){
        var n = await this.steam.getVanity();
        if(n.response.success == 1){
            this.steamID = n.response.steamid;
            this.steam.steamID = n.response.steamid;
            return true; 
        } else {
            return false;
        }
    }
}
module.exports = Updater;