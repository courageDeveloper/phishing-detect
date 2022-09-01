const express = require("express"); //require express
const { parse } = require('tldts');
const rp = require('request-promise');
const R = require('r-integration');
var app = express(); //use express
var cors = require('cors');
var bodyparser = require('body-parser');
const request = require('request');
const router = express.Router();
const port = 3000;

var features;

//CORS
app.use(cors());
//Body Parser
app.use(bodyparser.json());
app.use('/', router)

app.get("/", function (request, response) {
    response.send("Hello World!");
});

var url = '';

router.post('/posturl', (req, res, next) => {
    url = req.body.urlstring;
    if (url) {
        res.json({ success: true, message: "ok" });
    }
});

router.get('/r_result', (req, res, next) => {
    let result = R.executeRScript("./xgboost_phishing.R");
    console.log(result[result.length - 1]);
    return res.json(result[result.length - 1]);
})

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

function getRequest(req, res, next) {
    request({
        url: url,
        followRedirect: false
    }, (err, res, body) => {
        try {
            let urlhostname = new URL(url).hostname;
            let redirecthostname = new URL(res.headers.location).hostname;

            const stringEquality = urlhostname == redirecthostname;
            var nb_external_redirection = 0;

            if (stringEquality) {
                nb_external_redirection = 0;
            } else {
                nb_external_redirection = 1;
            }
        } catch (err) {
            console.log("error:", err);
            if (err) {
                nb_external_redirection = 0;
            }
        }
        req.body = nb_external_redirection;
        next();
    })

}

router.get('/nb_external_redirection', getRequest, (req, res, next) => {
    nb_external_redirection = req.body;
    return res.json(nb_external_redirection);
});

router.get('/tld_in_subdomain', getRequest, (req, res, next) => {
    let parsedObject = parse(url);
    console.log(parsedObject);
    return res.json(parsedObject);
});

router.get('/html_content', getRequest, (req, res, next) => {
    rp(url)
        .then(function (html) {
            //success!
            return res.json(html);
        })
        .catch(function (err) {
            //handle error
            return res.json(0);
        });
});

//Start Server
app.listen(port, () => {
    console.log('Server is running at port ' + port);
});
