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