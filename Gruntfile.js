'use strict';
module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            js: {
                files: '<%= jshint.files.src %>',
                tasks: ['jshint']
            }
        },
        jshint: {
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                noempty: true,
                trailing: true,
                undef: true,
                unused: true,
                quotmark: 'single',
                jquery: true,
                devel: false,
                browser: true,
                globals: {
                    define: true,
                    imagesLoaded: true,
                    EventEmitter: true
                }
            },
            files: {
                src: [
                    'jquery.breakpoint.js'
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    'assets/js/scripts.min.js': [
                        'assets/js/breakpoint.js',
                        'assets/js/plugins/*.js',
                    ]
                },
                options: {
                    // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
                    // sourceMap: 'assets/js/scripts.min.js.map',
                    // sourceMappingURL: '/app/themes/roots/assets/js/scripts.min.js.map'
                }
            }
        },
        version: {
            options: {
                file: 'lib/scripts.php',
                css: 'assets/css/main.min.css',
                cssHandle: 'roots_main',
                js: 'assets/js/scripts.min.js',
                jsHandle: 'roots_scripts'
            }
        },
        js: {
            files: [
                '<%= jshint.all %>'
            ],
            tasks: ['jshint', 'uglify', 'version']
        },
        livereload: {
            // Browser live reloading
            // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
            options: {
                livereload: false
            },
            files: [
                'assets/css/main.min.css',
                'assets/js/scripts.min.js',
                'templates/*.php',
                '*.php'
            ]
        },
        qunit: {
            functions: {
                options: {
                    urls: [ 'http://localhost:8000/functions.html' ],
                    page: {
                        viewportSize: { width: 300, height: 400 }
                    }
                }
            },
            resizeSmall: {
                options: {
                    urls: [ 'http://localhost:8000/resize.html' ],
                    page: {
                        viewportSize: { width: 300, height: 400 }
                    }
                }
            },
            resizeMedium: {
                options: {
                    urls: [ 'http://localhost:8000/resize.html' ],
                    page: {
                        viewportSize: { width: 700, height: 400 }
                    }
                }
            },
            resizeLarge: {
                options: {
                    urls: [ 'http://localhost:8000/resize.html' ],
                    page: {
                        viewportSize: { width: 1000, height: 400 }
                    }
                }
            }
        },
        sass: {
            options: {
                style: 'expanded'
            },
            files: {
                'asssets/css/main.min.css':'assets/style.scss'
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-wp-version');

    // Register tasks
    grunt.registerTask('default', [
        'jshint',
        'copy',
        'sass',
        'sass:test',
        'connect',
        'qunit'
    ]);

};
