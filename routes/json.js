const
    express = require('express')
    , router = express.Router()
    , axios = require('axios')
    , fs = require('fs')
    , path = require('path')
    , performanceJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'public/json/performance.json')))
    , notMalaysiaPerformanceJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'public/json/not-malaysia-performance.json')))

router.get('/performance', (req, res, next) => {
    console.log(req.ip);
    axios.get(`http://freegeoip.net/json/${req.ip}`)
        .then(response => {
            if (response.data.country_name === 'Malaysia' || response.data.country_name === 'Singapore') {
                res.json(performanceJSON);
            } else {
                res.send(notMalaysiaPerformanceJSON);
            }
        })
        .catch(err => {
            console.log(err);
            res.json(performanceJSON);
        });
});

router.get('/location', (req, res, next) => {

    axios.get(`http://freegeoip.net/json/${req.ip}`)
        .then(location => {
            return axios.get(`https://restcountries.eu/rest/v2/alpha/${location.data.country_code}`)
                .then(({data}) => {
                    res.json({
                        countryCode: data.alpha2Code,
                        callingCode: data.callingCodes[0]
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;