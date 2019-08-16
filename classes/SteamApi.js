const fetch = require('node-fetch');
const key = require('../config.json')
/*
Classes are async which means you need to have an await when calling them
*/
class SteamApi {
    constructor(steamID){
        this.steamID = steamID;
    }
    /* 
    Returns summary in JSON format of the given steam ID in the constructor
    */
    async getSummary(){
        var response = await fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + key.steamKey +'&steamids=' + this.steamID);
        var json = await response.json();
        return json;

    }
    /* 
    Returns vanity in JSON format of the given steam ID in the constructor
    */
   async getVanity(){
        var response = await fetch('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=' + key.steamKey +'&vanityurl=' + this.steamID);
        var json = await response.json();
        return json;
    }
    /* 
    Returns stats for Rust in JSON format of the given steam ID in the constructor;
    */
    async getStats(){
        var response = await fetch('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=252490&key=' + key.steamKey +'&steamid=' + this.steamID);
        var json = await response.json();
        return json
    }
}
module.exports = SteamApi;