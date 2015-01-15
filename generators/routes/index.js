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
    this.log('Generating route stubs... please stand by');

    var prompts = [
      {
        type: 'confirm',
        name: 'location',
        message: 'Are you in the root of your project? (you need to be)',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      // this.location = props.location;

      if(props.location){
        this.pkg = this.fs.readJSON('./package.json');
        this.routes = this.fs.readJSON('./routes.json');
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var that = this
        , routeReadHolder;

      that.log(that.routes);
      Object.keys(that.routes).forEach(function (route) {
        if(route === '/') {
          //is that the root route? we need to treat it specially
          if(that.fs.exists(process.cwd() + '/routes/home.js')){
            routeReadHolder = that.fs.read(process.cwd() + '/routes/home.js');
            //check for all the verbs...
            that.routes[route].forEach(function (verb) {
              var regex = new RegExp('route:' + route + ':' + verb.toLowerCase());
              if(!routeReadHolder.match(regex)){
                //the route does not yet exist... stub it out
                
              }
            });
            that.log(that.fs.read(process.cwd() + '/routes/home.js'));
          } else {
            console.log('no home!');
          }
        } else {
          if(that.fs.exists(process.cwd() + '/routes/' + route + '.js')){
            //TODO: this needs to check for routes not sub routes...
            console.log('i exist');
          } else {
            console.log('i dont exist :-(');
          }
        }
      });
      // this.fs.copyTpl(
      //   this.templatePath('_package.json'),
      //   this.destinationPath('package.json'),
      //   this
      // );

      // this.fs.copy(
      //   this.templatePath('./templates'),
      //   this.destinationPath('templates')
      // );
    }
  },

  install: function () {
    // this.installDependencies({
    //   skipInstall: true
    // });
  }
});
