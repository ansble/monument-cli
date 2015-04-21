'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log('Welcome to the ' + chalk.red('monumentjs cli') + '!');
    this.log('So you want to create a new data handler... please stand by');

    var prompts = [
      {
        type: 'confirm',
        name: 'location',
        message: 'Are you in the root of your project? (you need to be)',
        default: true
      }
      , {
        type: 'input',
        name: 'dataName',
        message: 'What is the name of this data handler?',
        default: 'article'
      }
    ];

    this.prompt(prompts, function (props) {
      // this.location = props.location;

      if(props.location){
        this.pkg = this.fs.readJSON('./package.json');
        this.dataName = props.dataName.replace(/ /g, '-');
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var that = this
        , fileName = that.dataName
        , readHolder;

      if(that.fs.exists(process.cwd() + '/data/' + fileName + '.js')){
        that.log('You are trying to overwrite an existing data handler... try a new name.');
      } else {
        readHolder = that.engine(that.fs.read(that.templatePath('_handler.js')), that);

        that.fs.write(process.cwd() + '/data/' + fileName + '.js', readHolder);
      }
    }
  }
});
