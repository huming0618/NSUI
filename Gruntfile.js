// Generated on 2015-02-27 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    repo:'/Users/peter/Desktop/workspace/77113/blog/wp-content/plugins/jaqen-cms/UI_repo'
  };

  var requireJSPaths = {
    can               : '../bower_components/canjs/amd/can',
    canControlPlugin  : '../bower_components/canjs/amd/can/control/plugin',
    jquery            : '../bower_components/jquery/dist/jquery',
    lodash            : '../bower_components/lodash/lodash.min',
    com_base          : '_base/js/component/base',
    comp_tabmenu      : '_base/js/component/tab-menu',
    comp_tabslider    : '_base/js/component/tab-slider'
    //PageEditor    : 'Widgets/PageEditor/PageEditor'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    requirejs : {
      build : {
        options : {
          baseUrl: 'app',
          paths: requireJSPaths,
          //exclude: ['jquery','can','mustache'],
          optimize: "none",
          name : '_base/js/app',
          out : 'build/app.js'
        }
      }
    },
    //showComponent: 'menu-zgw',
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      },

      show_comp: {
        files: ['app/theme/<%= showTheme %>/component/<%= showComponent %>/scss/{,*/}*.scss',
                'app/_base/js/{,*/}*.js', 
                'app/theme/<%= showTheme %>/component/<%= showComponent %>/js/{,*/}*.js', 
                'app/theme/<%= showTheme %>/component/<%= showComponent %>/{,*/}*.jade'],
        tasks: ['compass:build_comp','jade:build_comp','requirejs:build','copy:build_comp'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      show_theme: {
        files: ['app/theme/<%= showTheme %>/scss/{,*/}*.scss', 
                'app/_base/js/{,*/}*.js',
                'app/theme/<%= showTheme %>/js/{,*/}*.js', 
                'app/theme/<%= showTheme %>/{,*/}*.jade'],
        tasks: ['compass:build_theme','jade:build_theme','requirejs:build','copy:build_theme'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9005,
        open: true,
        livereload: 35732,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      show_theme:{
        options: {
          port: 9006,
          //index: 'index.html',
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect().use('/base', connect.static('./app/_base')),
              connect().use('/build', connect.static('./build')),
              connect.static('app/theme/' + grunt.config.get('showTheme') + "/build")
            ];
          }
        }
      },
      show_comp:{
        options: {
          port: 9006,
          //index: 'index.html',
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect().use('/base', connect.static('./app/_base')),
              connect().use('/component', connect.static('./theme/' + grunt.config.get('showTheme') + '/component')),
              connect().use('/build', connect.static('./build')),
              connect.static('app/theme/' + grunt.config.get('showTheme') + '/component/' + grunt.config.get('showComponent') + "/package/"+ '/' + grunt.config.get('showComponent'))
            ];
          }
        }
      },
      show_module:{
        options: {
          port: 9006,
          //index: 'index.html',
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect().use('/base', connect.static('./app/_base')),
              connect().use('/theme', connect.static('./app/theme/' + grunt.config.get('showTheme'))),
              connect().use('/component', connect.static('./app/theme/' + grunt.config.get('showTheme') + '/component')),
              connect().use('/build', connect.static('./build')),
              connect.static('app/theme/' + grunt.config.get('showTheme') + '/module/' + grunt.config.get('showModule'))
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      deploy: {
        src: ['<%= config.repo %>/theme/<%= showTheme %>'],
        options: {
          force: true
        }
      },

      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    compass: {
      build_base: {
        options: {
          force: true, 
          importPath: 'app/_base/scss',
          sassDir: 'app/_base/scss',
          specify: 'app/_base/scss/compass-blueprint.scss',
          cssDir: 'app/_base/styles'
        }
      }, 

      build_theme: {
        options: {
          force: true, 
          importPath: 'app/_base/scss',
          sassDir: 'app/theme/<%= showTheme %>/scss',
          specify: 'app/theme/<%= showTheme %>/scss/style.scss',
          cssDir: 'app/theme/<%= showTheme %>/build/styles'
        }
      }, 

      build_comp: {
        options: {
          force: true,
          importPath: 'app/_base/scss',
          sassDir:    'app/theme/<%= showTheme %>/component/<%= showComponent %>/scss',
          specify:    'app/theme/<%= showTheme %>/component/<%= showComponent %>/scss/style.scss',
          cssDir:     'app/theme/<%= showTheme %>/component/<%= showComponent %>/package/<%= showComponent %>/styles'        }

      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        sourceComments: 'map',
        includePaths: ['bower_components']
        },
      buildcom: {
        options:{
          style: 'expanded'
        },
        files:{
          //'app/theme/<%= showTheme %>/component/<%= showComponent %>/build/styles/base.css':'app/theme/<%= showTheme %>/_base/scss/base.scss',
          'app/theme/<%= showTheme %>/component/<%= showComponent %>/package/styles/style.css':'app/theme/<%= showTheme %>/component/<%= showComponent %>/scss/style.scss',
          'app/theme/<%= showTheme %>/component/<%= showComponent %>/build/style.css':'app/theme/<%= showTheme %>/component/<%= showComponent %>/scss/style.scss'
        }
      }, 
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    jade:{
      build_comp: {
        options:{pretty: true},
        files: {
          'app/theme/<%= showTheme %>/component/<%= showComponent %>/package/<%= showComponent %>/index.html':['app/theme/<%= showTheme %>/component/<%= showComponent %>/index.jade'],
          'app/theme/<%= showTheme %>/component/<%= showComponent %>/package/<%= showComponent %>/component.html':['app/theme/<%= showTheme %>/component/<%= showComponent %>/component.jade']
        }
      },
      build_theme: {
        options:{pretty: true},
        files: {
          'app/theme/<%= showTheme %>/build/index.html':['app/theme/<%= showTheme %>/index.jade']
        }
      },
      show_module: {
        options:{pretty: true},
        files: {
          'app/theme/<%= showTheme %>/module/<%= showModule %>/index.html':['app/theme/<%= showTheme %>/module/<%= showModule %>/demo.jade']
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html']
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      deploy:{
        files:[
          {
            expand: true,
            cwd: 'app/theme/zgw/component',
            src: ['*/package/**', '!*/package/*/index.html'],
            dot: true,
            dest:'<%= config.repo %>/theme/<%= showTheme %>/components'
          },
          {
            expand: true,
            cwd: 'app/theme/zgw/module',
            src: ['**','!*/*.jade'],
            dot: true,
            dest:'<%= config.repo %>/theme/<%= showTheme %>/modules'
          }
        ]
      },

      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },

      build_theme: {
        expand: true,
        cwd: 'app/theme/<%= showTheme %>/js',
        src: '*.js',
        dest: 'app/theme/<%= showTheme %>/build/js/'
      },

      build_comp: {
        expand: true,
        cwd: 'app/theme/<%= showTheme %>/component/<%= showComponent %>/js',
        src: '*.js',
        dest: 'app/theme/<%= showTheme %>/component/<%= showComponent %>/package/<%= showComponent %>/js/'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });

  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin',
    'htmlmin'
  ]);



  grunt.registerTask('default', [
    'build:all'
  ]);

  grunt.registerTask('build-theme','build theme', function(theme, show){
    if(typeof theme === undefined){
      grunt.log.error('Error - No Theme name is given');
      return;
    }
    grunt.log.writeln('build theme - ' + theme);  
    grunt.config.set('showTheme',theme);
    grunt.task.run('compass:build_base');
    grunt.task.run('compass:build_theme');
    //grunt.task.run('sass:buildcom');
    grunt.task.run('jade:build_theme');
    grunt.task.run('requirejs:build');
    grunt.task.run('copy:build_theme');

    if(show == "show"){
      grunt.task.run(['connect:show_theme','watch:show_theme']);
    }
    //grunt.task.run(['connect:showcom','watch:showcom']);
  });

  grunt.registerTask('build-comp','build component', function(theme, componentName, show){
    if(theme == undefined){
      grunt.log.error('Error - No theme name is given');
      return;
    }
    grunt.log.writeln('build component - ' + componentName);  

    grunt.config.set('showTheme',theme);
    grunt.config.set('showComponent',componentName);

    grunt.task.run('compass:build_base');
    grunt.task.run('compass:build_comp');

    grunt.task.run('jade:build_comp');

    grunt.task.run('requirejs:build');
    grunt.task.run('copy:build_comp');

    if(show){
      grunt.task.run(['connect:show_comp','watch:show_comp']);
    }

    //grunt.task.run(['connect:showcom','watch:showcom']);
  });

  grunt.registerTask('show-module','show module', function(theme, module){
    grunt.config.set('showTheme',theme);
    grunt.config.set('showModule',module);
    grunt.task.run('compass:build_base');
    grunt.task.run('compass:build_theme');
    grunt.task.run('copy:build_theme');
    grunt.task.run('requirejs:build');
    grunt.task.run('jade:show_module');
    grunt.task.run(['connect:show_module','watch:show_theme']);
  });

  // grunt.registerTask('copy-theme', 'copy the theme to wp plugin', function(){
  //   //grunt.file.setBase('/Users/peter/Desktop/workspace/NSUI/');
  //   grunt.file.copy('app/theme/zgw/index.jade', '/Users/peter/Desktop/workspace/77113/blog/wp-content/plugins/jaqen-cms/UI_repo');
  // });

  grunt.registerTask('deploy', 'deploy to the jaqen-cms plugin', function(theme){
    grunt.config.set('showTheme',theme);
    grunt.task.run('clean:deploy');
    grunt.task.run('copy:deploy');
    // grunt.task.run('copy-theme');
  });

  grunt.registerTask('package', 'build the package', function(){
    // grunt.task.run('copy-theme');
  });
  
  grunt.registerTask('parse-mod','show module', function(theme, module){
    var moduleXMLFile = grunt.file.read('./app/theme/' + theme + '/module/' + module + '/module.xml');
    //grunt.log.writeln(moduleXMLFile);
    var parseXML = require('node-xml-lite').parseString;
    var xmlObj = parseXML(moduleXMLFile);
    grunt.log.writeln(JSON.stringify(xmlObj))
    //load the module file

    //grunt.task.run(['connect:showcom','watch:showcom']);
  });
};
