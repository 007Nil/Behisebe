const yaml = require('js-yaml');
const fs   = require('fs');

function readConfig(){
    try{
        const masterConfig = yaml.load(fs.readFileSync("../configaration/config.yml","utf8"));
        return masterConfig;
    } catch (error){
        console.log(e);
    }
}

module.exports = readConfig;