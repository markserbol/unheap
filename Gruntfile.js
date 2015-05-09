'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
 
    jshint: {
      build: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          funcscope: true,
          globals: {
            $: false,
            jQuery: false
          },
        },
        src: ['build/js/**/*.js']
      } 
    },
    
    uglify: {
      build: {
        files: [{
          cwd: 'build/js',
          src: '**/*.js',
          dest: 'public/js',
          ext: '.min.js',
          expand: true
        }]
      }
    },
    
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          cacheLocation: 'build/sass/.sass-cache/'
        },
        files: [{
          expand: true,
          cwd: 'build/sass/',
          src: ['**/*.scss', '**/!_*.scss'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },
    
    cssc: {
      build: {
        options: {
          consolidateViaDeclarations: true,
          consolidateViaSelectors: true,
          consolidateMediaQueries: true,
          compress: true,
          lineBreaks: false
        },
        files: [{
          expand: true,
          cwd: 'build/css',
          src: ['**/*.css'],
          dest: 'public/css',
        }]
      }
    },

    watch: {
      js: {
        files: ['build/js/**/*.js'],
        tasks: ['jshint', 'uglify']
      },
      css: {
        files: ['build/sass/**/*.scss'],
        tasks: ['sass', 'cssc']
      }
    }
  });

  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-cssc');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'cssc', 'watch']);
}
