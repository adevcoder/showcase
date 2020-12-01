const path = require('path')
const axios = require("axios");
const random = require("./random-number");
const { config, configMain, configSS } = require("./configs/headers");
const { baseUrl, baseUrlMain, baseUrlSS } = require("./configs/urls")


var weight = [];
var variantID = [];

function getObj() {

     axios.get(baseUrlMain + '/admin/api/2020-07/orders.json?status=any', configMain)
        .then((resp) => {


            let number = Object.keys(resp.data.orders).length
            let lineItems = Object.keys(resp.data.orders[random.getRandomInt(number)].line_items).length
            let items = resp.data.orders[random.getRandomInt(number)]

            for (let i = 0; i < lineItems; i++) {
                
                if(!items.line_items[i].variant_id){

                    null;

                } else{
                    tmp = {
                        "variant_id": items.line_items[i].variant_id,
                        "quantity": 1
                    }
                    obj.push(tmp)
    
                }

            
                //console.log(lineItems + "::" + i + "::" + items.number + "::" + items.line_items[i].variant_id)
                   
            }
            //console.log(obj)


        })
        .catch((err) => { console.log(err) })

}
getObj()
var obj = [];
module.exports = {

    getObj: getObj,
    obj: obj


}
    // axios.get( )

    // .then((resp)=>{

    // variantId.push(randomVariant.data.products[getRandomInt(250)].variants[0].id)

    // })

    // .catch((err) => {console.log(err)})
