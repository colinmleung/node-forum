var credentials = require('./credentials.js');
var http = require('http');
var express  = require('express');
var jade = require('jade');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');

var mongoose = require('mongoose');
var opts = {
    server: {
	socketOptions: { keepAlive: 1 }
    }
};

require('./passport')(passport);

var app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));

switch(app.get('env')){
	case 'development':
	mongoose.connect(credentials.mongo.development.connectionString);
	break;
	case 'production':
	mongoose.connect(credentials.mongo.production.connectionString);
	break;
	default:
	throw new Error('Unknown execution environment: ' + app.get('env'));
}

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

require('./routes')(app, passport);

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + 
		 app.get('port') + '; press Ctrl-C to terminate.' );
});
