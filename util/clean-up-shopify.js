const axios = require("axios");
require("dotenv").config();

function cleanUpShopify() {
  const baseUrl = ""; //Put your own shopify url
  const config = {
    headers: {
      "X-Shopify-Access-Token": process.env.tokenS,
    },
  };

  var myOrders = [];

  axios
    .get(baseUrl + "/admin/api/2020-07/orders.json?status=any", config)
    .then((response) => {
      let number = Object.keys(response.data.orders).length;

      for (let i = 0; i < number; i++) {
        if (
          response.data.orders[i].email === "test@test.com" &&
          response.data.orders[i].source_name == ""
        ) {
          myOrders.push(response.data.orders[i].id);
        } else {
          null;
        }
      }
    })
    .then(() => {
      deleteMyOrders();
    })
    .catch((err) => {
      console.log(err);
    });

  function deleteMyOrders() {
    let _number = Object.keys(myOrders).length;

    for (let _i = 0; _i < _number; _i++) {
      axios
        .delete(
          baseUrl + `/admin/api/2020-07/orders/${myOrders[_i]}` + ".json",
          config
        )
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

module.exports.cleanUpShopify = cleanUpShopify;