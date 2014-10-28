module.exports = function(app, passport) {
    app.get('/login', function(req, res){
	res.render('logIn');
    });

/*    app.post('/login', function(req, res, next) {
	console.log('login posted');
	passport.authenticate('local', {
	    successRedirect: '/loggedIn',
	    failureRedirect: '/',
	    failureFlash: true
	})(req, res, next);
    });*/

    app.post('/login', passport.authenticate('local'), function(req, res) {
	console.log('something');
	res.redirect('/loggedIn');
	});

    app.get('/loggedIn', ensureAuthenticated, function(req, res){
	res.render('loggedIn');
    });

    app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
    });

    app.get('/signup', function(req, res){
	res.render('signUp');
    });

/*    app.post('/signup', urlencodedParser, function(req, res){
	console.log(req.body.password + req.body.passwordConfirmation + req.body.username);
	if (req.body.password == req.body.passwordConfirmation) {
	    var user = User.create({ username: req.body.username, password: req.body.password }, function(err){
		if(err) {
		    console.log(err);
		    res.redirect('/signup');
		} else {
		    res.redirect('/login');
		}
	    });
	} else {
	    res.render('signUp');
	}
    });*/

    function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	req.session.error = 'Please log in!';
	res.redirect('/login');
    }
};
