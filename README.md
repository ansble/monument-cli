# monument-cli
[![npm stats](https://nodei.co/npm/monument-cli.png)](https://nodei.co/npm/monument-cli)

[ ![Codeship Status for ansble/monument-cli](https://codeship.com/projects/4b195f80-9c55-0132-f7f8-3a6c943f49f1/status?branch=master)](https://codeship.com/projects/64333)

This is the CLI for working with [monument](http://monument.ansble.com). Its job is to make your life easier and your development faster by providing a set of workflow tools for managing the development process. They are outlined below... It is also the fastest way to get a monument project stood up and ready to go.

You use it by first installing it: `npm install -g monument-cli`

To get a new project simply navigate your terminal to the desired location and run `monument new` answer a few questions and you will have a basic project with an initial route stubbed out for you.

##commands

### `monument new <path-to-project>`

This is the command that gets you the basic project structure for a monument project. More information on [monument is available](http://monument.ansble.com) and you should check out the documentation there as well as this documentation.

So when you run `monument new <path-to-project>` you are going to be asked the following:
- What is the name of your project?
- What version shall we start with? (must be semver compatible and defaults to 1.0.0)
- And what are you about to build? (this is used to stub out some documentation for you)

From there it lays down a bunch of files after templating them. You end up with a directory structure like this:


````
	project/
        data/
            readme //placeholder for git to respect dir structure
        public/
            components/
                readme //placeholder for git to respect dir structure
            dist/
                readme //placeholder for git to respect dir structure
		routes/
			main.js
            main.test.js
			error.js
            error.test.js
		templates/
			main.jst
			error.jst
        test_stubs/
            connectionStub.js
		.bowerrc
		.editorconfig
		.eslintrc
        .gitignore
		readme.md
		app.js
        gulpfile.js
		package.json
		routes.json
````

#### About the `path-to-project` paramter

If you don't pass it a `<path-to-project>` it will default to `.`. Passing it a path that doesn't exist yet will create the path. If you try to create a project in a directory that has files in it the process will exit.

### `monument routes`

Takes your `routes.json` file and stubbs out any routes that are not currently written. These are placed in the `routes/` directory, as are stubbed out tests for them.

### `monument data <name-of-data-handler`

Stubs out evented data handlers for you on the fly... and gets them ready to use. These handlers are placed in the `data/` directory of your project and corresponding tests are placed new to them.
