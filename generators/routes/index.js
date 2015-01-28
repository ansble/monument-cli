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

      Object.keys(that.routes).forEach(function (route) {
        var fileName = route.split('/')
          , localRoute = route;

        if(fileName[0] !== ''){
          console.log(chalk.yellow('You have a route that doesn\'t begin with "/"... you should fix that'));
          fileName = fileName[0];
          localRoute = '/' + route;
        } else {
          fileName = fileName[1];
        }

        if(route === '/'){
          fileName = "main"
        }

        if(that.fs.exists(process.cwd() + '/routes/' + fileName + '.js')){
          routeReadHolder = that.fs.read(process.cwd() + '/routes/' + fileName + '.js');
          //check for all the verbs...
          that.routes[route].forEach(function (verb) {
            var regex = new RegExp('route:' + localRoute + ':' + verb.toLowerCase());

            if(!routeReadHolder.match(regex)){
              //the route does not yet exist... stub it out

              routeReadHolder += '\r\n\r\n' + that.engine(that.fs.read(that.templatePath('_existingRoute.js')), {routePath: localRoute, routeVerb: verb});

              that.fs.write(process.cwd() + '/routes/' + fileName + '.js', routeReadHolder);
            }
          });
        } else {
          routeReadHolder = that.engine(that.fs.read(that.templatePath('_route.js')), {});

            that.routes[route].forEach(function (verb) {                
                routeReadHolder += '\r\n\r\n' + that.engine(that.fs.read(that.templatePath('_existingRoute.js')), {routePath: route, routeVerb: verb});
            });

            that.fs.write(process.cwd() + '/routes/' + fileName + '.js', routeReadHolder);
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
  }
});
