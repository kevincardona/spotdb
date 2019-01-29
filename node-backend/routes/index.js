var router      = require('express').Router();
var spotify     = require('./spotify');

router.get('/', (req, res) => {
    res.send({success: 'true', message: 'Connected to SpotDB server.'})
});

router.get('/login', spotify.login);
router.post('/getaccess', spotify.getaccess);
module.exports = router;