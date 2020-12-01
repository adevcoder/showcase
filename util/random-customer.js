const path = require('path')
require("dotenv").config({path: path.join(__dirname, '../.env')})
const axios = require("axios");
const random = require("./random-number");

const { configMain } = require("./configs/headers");

const countries = ["United States", "Canada", "France", "United Kingdom", "Japan", "Singapore", "Switzerland", "Belgium", "Spain", "United Arab Emirates", "Martinique", "Guadeloupe", "Norway", "Germany", "Netherlands",
"Chile", "Ireland", "Qatar", "Philippines", "French Guiana", "Sweden", "Italy", "South Africa", "Cayman Islands", "Israel", "India", "Costa Rica", "Reunion", "Denmark", "Indonesia", "Austria", "Aruba", "Malaysia",
"Portugal", "Kuwait", "Trinidad And Tobago", "Bahrain", "Saudi Arabia", "Morocco", "Antigua And Barbuda",
"Mexico", "Hong Kong", "Suriname", "Iceland", "Barbados", "Mauritius", "Russia", "China", "Australia", "South Korea", "Zambia", "Seychelles", "Greece", "Finland", "Argentina", "Pakistan", "Virgin Islands, British",
"Sint Maarten", "Brazil", "Luxembourg", "Guatemala", "Jamaica", "Mayotte", "Nigeria", "Dominican Republic",
"Ukraine", "Poland", "Lithuania", "Cyprus", "Monaco", "Lebanon", "Turks And Caicos Islands", "Guernsey",
"French Polynesia", "New Caledonia", "Thailand", "Colombia", "Bermuda", "Greenland", "Taiwan", "Cambodia",
"Turkey", "New Zealand",
];

function getId() {
    var country = countries[Math.floor(Math.random() * countries.length)];
     axios
       .get(
           process.env.baseUrlMain +
           `/admin/api/2020-07/customers/search.json?country=${country}&orders_count_min=0`,
           configMain
       )
       .then((resp) => {
           let number = Object.keys(resp.data.customers).length
           let _number = random.getRandomInt(number)
           let data = resp.data.customers[_number].id
           console.log(data)

       })
       .catch((err) => {
           console.log(err);
       });

    }
    
module.exports = {
   getId: getId

}