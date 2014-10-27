var http = require('http');
var express  = require('express');
var jade = require('jade');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/login', function(req, res){
    console.log('log in route reached');
    res.render('logIn');
});

app.get('/signup', function(req, res){
    console.log('sign up route reached');
    res.render('signUp');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + 
		 app.get('port') + '; press Ctrl-C to terminate.' );
});
