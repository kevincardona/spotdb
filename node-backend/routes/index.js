var router      = require('express').Router();
var spotify     = require('./spotify');
var user        = require('./user');
var util        = require('./util');

router.get('/', (req, res) => {
    res.send({success: 'true', message: 'Connected to SpotDB server.'})
});
router.get('/login', spotify.login);
router.get('/search', spotify.search);
router.get('/getaddress', util.getAddress);
router.post('/authorized', user.authorize);


// Anything below requires user to be logged in
router.use(user.authenticate);
router.get('/authenticate', (req,res) => { return res.json({success: true, authenticated: true})})
router.get('/accountinfo', spotify.accountInfo)
router.get('/getHome', user.getHome);
router.post('/sethome', user.setHome);
router.get('/listening', spotify.listening);
router.post('/currentlisteners', spotify.currentListeners);

module.exports = router;