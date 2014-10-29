var Browser = require('zombie');
var assert = require('chai').assert;

var browser;

suite('Authentication Tests', function(){
    
    setup(function(){
	browser = new Browser();
    });

    test('sign up page should have correct title',
	 function(done){
	     var signUpUrl = 'http://localhost:3000/signup';
	     browser.visit(signUpUrl, function(){
		 
	 });
});
