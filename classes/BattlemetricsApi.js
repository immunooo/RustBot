const fetch = require('node-fetch');
class BattleMetricsApi{

    async getServerStats(serverid){
        var response = await fetch('https://api.battlemetrics.com/servers/' + serverid);
        var json = await response.json();
        return json;
    }
}
module.exports = BattleMetricsApi;