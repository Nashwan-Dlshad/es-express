const fs = require("fs");
const {execSync} = require('child_process')

const checkFile = (path)=>{
    if(!fs.existsSync(path)){
       return false
}
else{
    return true
}
}

const checkFolder = (path)=>{
    if(!fs.existsSync(path)){
        return false
    }
}


module.exports = {
    checkFile,
    checkFolder
}