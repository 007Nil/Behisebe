const yaml = require('js-yaml');
const fs   = require('fs');
const path = require("path");

function readConfig(){
    let absoluteConfigPath = path.resolve("alpha_web_app","../configaration/config.yml");
    try{
        const masterConfig = yaml.load(fs.readFileSync(absoluteConfigPath,"utf8"));
        // console.log(masterConfig)
        return masterConfig;
    } catch (error){
        console.log(error);
    }
}

module.exports = { readConfig };