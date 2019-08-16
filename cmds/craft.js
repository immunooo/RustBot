const itemlist = require('../userData/otherData/craftingList.json')
const discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
        for(var i = 0; i < args.length; i++){
            args[i] = args[i].toLowerCase();
        }
        
        var item = "";
        for(var i = 0; i < args.length - 1; i++){
            item = item + args[i]
        
        }
        var quantity = args[args.length - 1];
        
        if(args[0] != ""){
            
            if(item == "" && quantity != ""){
                item = quantity;
                quantity = 1;
            
            }
            
            var num = -1;
            for(var i = 0; i < itemlist.items.length; i++){
                if(itemlist.items[i].name == item){
                    num = i;
                }
                for(var j = 0; j < itemlist.items[i].aliases.length; j++){
                    if(itemlist.items[i].aliases[j] == item){
                        num = i;
                    } 
                } 
            }
            if (num == -1){
                item = item + quantity;
                quantity = 1;
                for(var i = 0; i < itemlist.items.length; i++){
                    if(itemlist.items[i].name == item){
                        num = i;
                    }
                    for(var j = 0; j < itemlist.items[i].aliases.length; j++){
                        if(itemlist.items[i].aliases[j] == item){
                            num = i;
                        } 
                    }  
                }
            }
            if(isNaN(quantity)){
                quantity = 0;
            }
            quantity = Math.ceil(quantity);
            if(quantity < 1){
                quantity = 1;
            }
            if(quantity > 20000){
                quantity = 20000;
            }
            if(num >= 0){
                var materials = "";
                var rawMaterials = "";
                
                for(var i = 0; i < itemlist.items[num].all_materials[0].materials.length; i++){
                    materials =  materials + itemlist.items[num].all_materials[0].materials[i].name + ": " + itemlist.items[num].all_materials[0].materials[i].value * quantity + "\n";
                }
                
                for(var i = 0; i < itemlist.items[num].all_materials[1].raw_materials.length; i++){
                    rawMaterials =  rawMaterials + itemlist.items[num].all_materials[1].raw_materials[i].name + ": " + itemlist.items[num].all_materials[1].raw_materials[i].value * quantity + "\n";
                }
                
                var output = new discord.RichEmbed()
                .setTitle(itemlist.items[num].realName + " (" + quantity + ")")
                .setDescription(itemlist.items[num].workbench)
                .setColor("#ff0000")
                .setThumbnail(itemlist.items[num].picture)
                .addField("Materials", materials)
                .addField("Raw Materials", rawMaterials);
                return message.channel.send({embed:output});
            } else {
                return message.channel.send("Invalid item.\n**Itemlist:**\nTimed Explosive\nSatchel Charge\nRifle Ammo\nExplosive Ammo\nHV Rifle Ammo\nIncendiary Rifle Ammo\nPistol Bullet\nHV Pistol Bullet\nIncendiary Pistol Bullet\nBuckshot\nSlug\nIncendiary Shell\nHandmade shell\nWooden Arrow\nHV Arrow\nRocket\nHV Rocket\nIncendiary Rocket")
            }
            

        } else{
            message.channel.send("Please have a item. Example Syntax: r!craft rocket 100")
        }
}
module.exports.help = {
    name:"craft"
}