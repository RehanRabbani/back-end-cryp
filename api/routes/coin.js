const express = require('express');
const router = express.Router();

const info =require('../models/info');

var ccxt = require ('ccxt')

 const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: 1,
    limit: 5000,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '2bbb0b08-6525-4583-b260-8aee17c8f52d'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
    console.log("hello", response.data);

    router.post('/postinfo',(req,res,next)=>{
        
        for(let i=0; i<=200; i++){
        let coins = {
            name: response.data[i].name,
            circulating_supply: response.data[i].circulating_supply,
            symbol: response.data[i].symbol,
            slug:response.data[i].slug,
            cmc_rank: response.data[i].cmc_rank,
            total_supply:  response.data[i].total_supply,
            max_supply: response.data[i].max_supply
            
        }
        info.create(coins).then(function (coin) {
             console.log(coin);
            res.send(coin)
        }).catch(next)
    }
    })

 

}).catch((err) => {
  console.log('API call error:', err.message);
});

router.get('/getinfo',(req,res,next)=>{
    let i=0;
    info.find({}, function (err, coins) {
        let coinArray = [];
        coins.forEach(function (coin) {
            coinArray[i++] = coin;
        });
        res.send(coinArray);
    });
});

router.get('/:id',(req,res,next)=>{

    info.findById(req.params.id)
    .then( a => {
        if(!a){ 
            return res.status(404).end()}
        return res.status(200).json(a)
    })
    .catch(err => next(err));
})

module.exports = router;