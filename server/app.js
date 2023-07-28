// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    if(!req.body || !req.body.name || !req.body.date){
        console.error('incomplete request');
        res.status(400).json({msg: "incomplete request"})

    }else{
        const name = req.body.name;
        const date = req.body.date;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.polygon.io/v1/open-close/${name}/${date}?adjusted=true&apiKey=OP8NAtEvN1ynYMMbuVDVXGnNDYYNx1pk`,
            headers: { }
            };
    
            axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
            res.status(200).json({data: response.data})
            })
            .catch((error) => {
            console.log(error);
            res.status(400).json({msg: "polygon error"})
            });
        
    }
   
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));