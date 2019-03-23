var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var routes      = require('./routes');
var cors        = require('cors');
var config      = require('./config');

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//All endpoints are defined in ./routes/index.js
app.use('/', routes);
var server = app.listen(config.port, () => {
    console.log('Server started on port ' + config.port);
});