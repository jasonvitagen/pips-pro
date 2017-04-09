const
    express = require('express')
    , router = express.Router()
    , axios = require('axios')
    , fs = require('fs')
    , path = require('path')
    , performanceJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'public/json/performance.json')))
    , notMalaysiaPerformanceJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'public/json/not-malaysia-performance.json')))

router.get('/performance', (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);
    axios.get(`http://freegeoip.net/json/${ip}`)
        .then(response => {
            if (response.data.country_name === 'Malaysia') {
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

module.exports = router;