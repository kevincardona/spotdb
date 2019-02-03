var router      = require('express').Router();
var spotify     = require('./spotify');

router.get('/', (req, res) => {
    res.send({success: 'true', message: 'Connected to SpotDB server.'})
});

router.get('/login', spotify.login);
//router.get('/search', spotify.search);
router.get('/authorized', spotify.authorized);
router.get('/getaccess', spotify.getaccess);
module.exports = router;