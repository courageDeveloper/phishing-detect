const express = require("express"); //require express
const { parse } = require('tldts');
const rp = require('request-promise');
const R = require('r-integration');
var app = express(); //use express
var cors = require('cors');
var bodyparser = require('body-parser');
const request = require('request');
const router = express.Router();
const port = 5000;

var features;

//CORS
app.use(cors());
//Body Parser
app.use(bodyparser.json());
app.use('/', router)

app.get("/", function (request, response) {
    response.send("Okay!")
});

router.post('/features', (req, res, next) => {
    features = req.body.featureObject;
    if (features) {
        res.json({ success: true, message: "ok" });
    }
});

router.get('/get_features', (req, res, next) => {
    console.log(features);
    return res.json(features);
});

//Start Server
app.listen(port, () => {
    console.log('Server is running at port ' + port);
});
