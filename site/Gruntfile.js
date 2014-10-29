module.exports = function(grunt){

    // load plugins
    grunt.loadNpmTasks('grunt-cafe-mocha');

    // configure plugins
    grunt.initConfig({
	cafemocha: {
	    all: { src: 'qa/authentication.js' }
	}
    });

    // register tasks
    grunt.registerTask('default', ['cafemocha']);
};
