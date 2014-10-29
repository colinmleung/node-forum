module.exports = function(grunt){

    // load plugins
    [
	'grunt-cafe-mocha',
	'grunt-contrib-jshint',
    ].forEach(function(task){
	grunt.loadNpmTasks(task);
    });

    // configure plugins
    grunt.initConfig({
	cafemocha: {
	    all: { src: 'qa/authentication.js' }
	},
	jshint: {
	    app: ['node-forum.js']
	}
    });

    // register tasks
    grunt.registerTask('default', ['cafemocha', 'jshint']);
};
