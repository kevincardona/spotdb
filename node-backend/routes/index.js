var router      = require('express').Router();
var spotify     = require('./spotify');

router.get('/', (req, res) => {
    res.send({success: 'true', message: 'Connected to SpotDB server.'})
});

router.get('/login', spotify.login);
router.get('/authorized', spotify.authorized);
router.get('/accountinfo', spotify.accountInfo)
router.get('/search', spotify.search);

module.exports = router;