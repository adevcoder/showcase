const path = require('path')
require("dotenv").config({path: path.join(__dirname, '../../.env')})

module.exports.baseUrl = process.env.baseUrl;
module.exports.baseUrlMain = process.env.baseUrlMain;
module.exports.baseUrlSS = process.env.baseUrlSS;
