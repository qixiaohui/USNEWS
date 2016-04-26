/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    },
    replace: {
      dev: {
        overwrite: true,
        src: ['./util/url.js', './client/app/scripts/services/service.js'],
        replacements: [{
          from: 'mongodb://heroku_9l6cm7s0:p5imro0edhlee80ahcieoar1g5@ds013981.mlab.com:13981/heroku_9l6cm7s0',                   // string replacement 
          to: 'mongodb://localhost:27017/USNEWS'
        },{
          from: 'http://polar-sands-49796.herokuapp.com',                   
          to: 'http://localhost:2000'          
        }]
      },
      deploy: {
        overwrite: true,
        src: ['./util/url.js', './client/app/scripts/services/service.js'],
        replacements: [{
          to: 'mongodb://heroku_9l6cm7s0:p5imro0edhlee80ahcieoar1g5@ds013981.mlab.com:13981/heroku_9l6cm7s0',                   // string replacement 
          from: 'mongodb://localhost:27017/USNEWS'
        },{
          to: 'http://polar-sands-49796.herokuapp.com',                    
          from: 'http://localhost:2000'          
        }]
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

  //Switch to dev
  grunt.registerTask('dev', ['replace:dev']);

  //switch to deploy
  grunt.registerTask('deploy', ['replace:deploy']);

};
