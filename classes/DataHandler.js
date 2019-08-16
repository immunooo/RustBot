const Updater = require("./Updater")
class DataHandler {
    constructor(statNames, steamID) {
        this.data = [];
        this.statNames = statNames;
        this.user = new Updater(steamID);
    }
    /*
    adds the value of the stat names to the data variable in the order of the array given in statNames
    it is in the order you ask for the stats in
    */
    parseStats(){
        var userData = this.user.getStats();
        var count = 0;
        var index = 0;
        while(count < userData.playerstats.stats.length){
            while(index < this.statNames.length){
                if(userData.playerstats.stats[count].name == this.statNames[index]){
                    this.data[index] = (userData.playerstats.stats[count].value);
                }
                index++;
            }
            index = 0;
            count++;
        }
    }
    /*
    returns the data
    */
    getData(){
        return this.data;
    }
}
module.exports = DataHandler;