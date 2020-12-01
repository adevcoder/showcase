const axios = require("axios");
const random = require("./util/random-number");
const getId = require("./util/random-customer");
//const getObj = require("./util/random-products-weight-shipping")
const { config, configSS, configMain } = require("./util/configs/headers");
const { baseUrl, baseUrlMain, baseUrlSS } = require("./util/configs/urls");

var obj = [];
var variantID = [];
var orderPayload;
const countries = [
  "United States",
  "Canada",
  "France",
  "United Kingdom",
  "Japan",
  "Singapore",
  "Switzerland",
  "Belgium",
  "Spain",
  "United Arab Emirates",
  "Martinique",
  "Guadeloupe",
  "Norway",
  "Germany",
  "Netherlands",
  "Chile",
  "Ireland",
  "Qatar",
  "Philippines",
  "French Guiana",
  "Sweden",
  "Italy",
  "South Africa",
  "Cayman Islands",
  "Israel",
  "India",
  "Costa Rica",
  "Reunion",
  "Denmark",
  "Indonesia",
  "Austria",
  "Aruba",
  "Malaysia",
  "Portugal",
  "Kuwait",
  "Trinidad And Tobago",
  "Bahrain",
  "Saudi Arabia",
  "Morocco",
  "Antigua And Barbuda",
  "Mexico",
  "Hong Kong",
  "Suriname",
  "Iceland",
  "Barbados",
  "Mauritius",
  "Russia",
  "China",
  "Australia",
  "South Korea",
  "Zambia",
  "Seychelles",
  "Greece",
  "Finland",
  "Argentina",
  "Pakistan",
  "Virgin Islands, British",
  "Sint Maarten",
  "Brazil",
  "Luxembourg",
  "Guatemala",
  "Jamaica",
  "Mayotte",
  "Nigeria",
  "Dominican Republic",
  "Ukraine",
  "Poland",
  "Lithuania",
  "Cyprus",
  "Monaco",
  "Lebanon",
  "Turks And Caicos Islands",
  "Guernsey",
  "French Polynesia",
  "New Caledonia",
  "Thailand",
  "Colombia",
  "Bermuda",
  "Greenland",
  "Taiwan",
  "Cambodia",
  "Turkey",
  "New Zealand",
];
var country = countries[Math.floor(Math.random() * countries.length)];

axios
  .get(baseUrlMain + "/admin/api/2020-07/orders.json?status=any", configMain)
  .then((resp) => {
    let number = Object.keys(resp.data.orders).length;
    let lineItems = Object.keys(
      resp.data.orders[random.getRandomInt(number)].line_items
    ).length;
    let items = resp.data.orders[random.getRandomInt(number)];
    var weight = [];

    for (let i = 0; i < lineItems; i++) {
      
      if (items.line_items[i] === undefined) {
        null;
      } else {
        var _obj = {
          variant_id: items.line_items[i].variant_id,
          name: items.line_items[i].name,
          title: items.line_items[i].title,
          price: items.line_items[i].price,
          sku: items.line_items[i].sku,
          variant_title: items.line_items[i].variant_title,
          grams: items.line_items[i].grams,
        };
        obj.push(_obj);

        weight.push(items.line_items[i].grams);
      }
    }
    var gram = weight.reduce((a, b) => a + b, 0);
    var g2oz = 0.0353;
    var oz = gram * g2oz;
    return (data = {
      0: weight.reduce((a, b) => a + b, 0),
      1: obj,
      2: oz,
    });
  })
  .then((resp) => {
    //Getting Customer info
    var _weight = resp[0];
    var orderItems = resp[1];
    var oz = resp[2];
    return axios

      .get(
        process.env.baseUrlMain +
          `/admin/api/2020-07/customers/search.json?country=${country}&orders_count_min=0`,
        configMain
      )
      .then((resp) => {
        let number = Object.keys(resp.data.customers).length;
        let _number = random.getRandomInt(number);
        let data = resp.data.customers[_number].id;
        let addressMain = resp.data.customers[_number].addresses[0];
        let fname = addressMain.first_name;
        let lname = addressMain.last_name;
        let address1 = addressMain.address1;
        let city = addressMain.city;
        let province = addressMain.province_code;
        let country = addressMain.country;
        let zip = addressMain.zip;
        let country_code = addressMain.country_code;
        let phone = addressMain.phone;
        //console.log(resp.data.customers[_number])

        return (_data = {
          0: data,
          1: fname,
          2: lname,
          3: address1,
          4: city,
          5: country,
          6: zip,
          7: country_code,
          8: province,
          9: _weight,
          10: phone,
          11: orderItems,
          12: oz,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .then((res) => {
    var toState = res[8];
    var toCountry = res[7];
    var toPostalCode = res[6];
    var toCity = res[4];
    var _weight = res[9];
    var data = res[0];
    var fname = res[1];
    var lname = res[2];
    var address1 = res[3];
    var country = res[5];
    var phone = res[10];
    var id = res[0];
    var orderItems = res[11];
    var oz = res[12];

    var body = JSON.stringify({
      carrierCode: "ups",
      serviceCode: null,
      packageCode: null,
      fromPostalCode: "91748",
      toState: toState,
      toCountry: toCountry,
      toPostalCode: toPostalCode,
      toCity: toCity,
      weight: { value: _weight, units: "grams" },
      dimensions: { units: "inches", length: 14, width: 10, height: 6 },
      confirmation: "delivery",
      residential: false,
    });

    return axios
      .post(baseUrlSS, body, configSS)
      .then((res) => {
        return (data = {
          0: res.data[random.getRandomInt(2)],
          1: fname,
          2: lname,
          3: address1,
          4: toCity,
          5: country,
          6: toPostalCode,
          7: phone,
          8: id,
          9: toState,
          10: orderItems,
          11: oz,
          12: _weight,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .then((res) => {
    let serviceName = res[0].serviceName;
    let shippingCost = res[0].shipmentCost;
    let phone = res[7];
    let data = res[8];
    let fname = res[1];
    let lname = res[2];
    let address = res[3];
    let country = res[5];
    let city = res[4];
    let province = res[9];
    let zip = res[6];
    let orderItems = res[10];
    let oz = res[11];
    let weight = res[12];

    return (orderPayload = {
      order: {
        line_items: orderItems,
        total_weight: weight,
        customer: {
          //id: data,
          first_name: fname,
          last_name: lname,
          email: "test@test.com",
        },
        // billing_address: {
        //   first_name: fname,
        //   last_name: lname,
        //   address1: address ,
        //   phone: phone,
        //   city: city,
        //   province: province,
        //   country: country,
        //   zip: zip,
        // },
        shipping_address: {
          first_name: fname,
          last_name: lname,
          address1: address,
          phone: phone,
          city: city,
          province: province,
          country: country,
          zip: zip,
        },
        email: "test@test.com",
        fulfillment_status: "unfulfilled",
        financial_status: "paid",
        status: "open",
        shipping_lines: [
          {
            custom: true,
            price: shippingCost,
            title: serviceName,
          },
        ],
      },
    });
  })
  .then((res) => {
    let body = res;
    //  console.log(body)

    return body;
  })
  .then((res) => {
    var body = res;
    axios
      .post(
        baseUrlMain + "/admin/api/2020-07/orders.json",
        body,
        configMain
      )
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
