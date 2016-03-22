var express        = require('express'),
    app            = express(),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    port = process.env.PORT || 1000,
    db = require('./config/db');
    
mongoose.connect(db.url); 

var subdomainOptions = {
    base: 'localhost' //base is required, you'll get an error without it.
};

app.use(require('subdomain')(subdomainOptions));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.use('/app', express.static(__dirname + '/public/app'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/libs', express.static(__dirname + '/public/libs'));
require('./app/routes')(app); 
app.all('/*', function(req, res, next) {
    res.sendFile('/public/index.html', { root: __dirname });
}); 

app.listen(port);	
console.log('Magic happens on port ' + port);