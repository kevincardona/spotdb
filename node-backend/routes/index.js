var router      = require('express').Router();

router.get('/', (req, res) => {
    res.send({success: 'true', message: 'Connected to SpotDB server.'})
});

module.exports = router;