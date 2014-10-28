var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js');

module.exports = function(passport){
    // Set up Passport sessions
    passport.serializeUser(function(user, done){
	console.log('serializing ' + user._id);
	done(null, user._id);
    });

    passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
	    console.log('deserializing ' + id);
	    done(err, user);
	});
    });

    // Set up Passport authentication strategy
    passport.use('local', new LocalStrategy(
	function(username, password, done){
	    console.log('in strategy');
	    process.nextTick(function(){
		User.findOne({ username: username }, function(err, user){
		    if (err) { console.log(err); return done(err); }
		    if (!user) {
			console.log('Incorrect username.');
			return done(null, false, { message: 'Incorrect username.' });
		    }
		    if (user.password !== password){
			console.log(user.password);
			console.log(password);
			console.log('Incorrect password.');
			return done(null, false, { message: 'Incorrect password.' });
		    }
		    console.log('good login');
		    return done(null, user);
		});
	    });
	}
    ));
};
