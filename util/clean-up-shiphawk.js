const axios = require("axios");
require("dotenv").config();

function cleanUpShipHawk() {
  const baseUrl = " https://shiphawk.com/api/v4/orders/";
  const config = {
    headers: {
      "X-Api-Key": process.env.tokenSH,
    },
  };

  var totalNumbers = [];

  axios
    .get(baseUrl, config)
    .then((resp) => {
      let number = Object.keys(resp.data).length;

      for (let i = 0; i < number; i++) {
        if (resp.data[i].destination_address.email == "test@test.com") {
          totalNumbers.push(resp.data[i].id);
        } else {
          null;
        }
      }
    })
    .then(() => {
      let number = Object.keys(totalNumbers).length;
      for (let x = 0; x < number; x++) {
        axios.delete(baseUrl + totalNumbers[x], config);
      }
    })
    .catch((err) => console.log(err));
}
module.exports.cleanUpShipHawk = cleanUpShipHawk;