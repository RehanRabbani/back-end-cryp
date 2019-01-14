
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const coinSchema = new Schema({
    name: {
        type: String,
      
    },
    circulating_supply: {
        type: String,
       
    },
    symbol:{
        type:String
    },

    slug: {
        type: String
    },
    cmc_rank: {
        type: String,
        
    },
   
    total_supply: {
     type: String,
   
    }, 

    max_supply: {
        type: String,
       }, 

     

   
})

const CapBit = mongoose.model('coin',coinSchema);
module.exports = CapBit;

