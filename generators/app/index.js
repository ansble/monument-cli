'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(
      'Welcome to the ' + chalk.red('monumentjs cli') + '!'
    );

    var prompts = [{
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        default: 'Milan-San Remo'
      },
      {
        type: 'input',
        name: 'version',
        message: 'What version shall we start with?',
        default: '1.0.0',
        validate: function (input) {
          if(input.match(/^[0-9]+\.[0-9]+\.[0-9]+$/)){
            return true;
          } else {
            return "Must be a semver style version";
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'And what are you about to build?',
        default: 'Something truly mindblowingly awesome'
      }
      // ,{
      //   type: 'confirm',
      //   name: 'gulp',
      //   message: 'Want a starter gulpfile?',
      //   default: true
      // }
    ];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.packageName = props.name.replace(/[\s]/g, '-');
      this.version = props.version;
      this.description = props.description;
      this.gulp = props.gulp;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('_readme.md'),
        this.destinationPath('README.md'),
        this
      );

      this.fs.copy(
        this.templatePath('./routes'),
        this.destinationPath('routes')
      );

      this.fs.copy(
        this.templatePath('_routes.json'),
        this.destinationPath('routes.json')
      );

      this.fs.copy(
        this.templatePath('_app.js'),
        this.destinationPath('app.js')
      );
      this.fs.copy(
        this.templatePath('./public'),
        this.destinationPath('public')
      );
      this.fs.copy(
        this.templatePath('./templates'),
        this.destinationPath('templates')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
