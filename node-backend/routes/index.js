var router      = require('express').Router();
var spotify     = require('./spotify');

router.get('/', (req, res) => {
    res.send({success: 'true', message: 'Connected to SpotDB server.'})
});

var params = router.get('/login', spotify.login);
//console.log(params.stack[0].route)
router.post('/getaccess', spotify.getaccess);
module.exports = router;