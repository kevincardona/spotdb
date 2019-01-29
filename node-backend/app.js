var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var routes      = require('./routes');
var port        = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//All endpoints are defined in ./routes/index.js
app.use('/', routes);
app.listen(port, () => {
    console.log('Server started on port ' + port);
})