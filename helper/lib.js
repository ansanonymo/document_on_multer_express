const path = require("path");



const helpers = {
    getExtension(pathString){
        return path.extname(pathString);
    }
}

module.exports = helpers;