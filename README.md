# monument-cli
[![npm stats](https://nodei.co/npm/generator-monument-cli.png)](https://nodei.co/npm/generator-monument-cli)

This is the CLI for working with [monument](http://monument.ansble.com). Its job is to make your life easier and your development faster by providing a set of workflow tools for managing the development process. They are outlined below... It is also the fastest way to get a monument project stood up and ready to go.

You use it by first installing it: `npm install -g generator-monument-cli`

To get a new project simply navigate your terminal to the desired location and run `yo monument-cli` answer a few questions and you will have a basic project with an initial route stubbed out for you.

##commands

###yo monument-cli

This is the command that gets you the basic project structure for a monument project. More information on [monument is available](http://monument.ansble.com) and you should check out the documentation there as well as this documentation.

So when you run `yo monument-cli` you are going to be asked the foloowing:
- What is the name of your project?
- What version shall we start with? (must be semver compatible)
- And what are you about to build? (this is used to stub out some documentation for you)

From there it lays down a bunch of files after templating them. You end up with a directory structure like this:


````
	project/
		routes/
			main.js
			error.js
		templates/
			main.jst
			error.jst
		.bowerrc
		.editorconfig
		.jshintrc
		README.md
		app.js
		bower.json
		package.json
		routes.json
````

###yo monument-cli:routes

Takes your `routes.json` file and stubbs out any routes that are not currently written.

###yo monument-cli:data

Stubs out evented data handlers for you on the fly... and gets them ready to use.
