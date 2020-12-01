const path = require('path')
require("dotenv").config({path: path.join(__dirname, '../../.env')})

const config = {
  headers: {
    "X-Shopify-Access-Token": process.env.tokenS,
  },
};

const configMain = {
  headers: {
    "X-Shopify-Access-Token": process.env.tokenSMain,
  },
};

const configSS = {
  headers: {
    Host: "ssapi.shipstation.com",
    Authorization: "Basic " + process.env.tokenSS,
    "Content-Type": "application/json",
  },
};

module.exports.config = config;
module.exports.configSS = configSS;
module.exports.configMain = configMain;