### - 2.5.2 *9/22/2015, 5:04:19 PM*




### - 1.5.2 *9/22/2015, 5:04:09 PM*

  - Merge pull request #27 from ansble/v2.0.0-release
  - Updates for v2 monument release


### - 1.5.1 *5/7/2015, 5:08:26 AM*

  - Merge pull request #25 from ansble/bug/gulp-log
  - replaced a gulp.log with console.log


### - 1.5.4 *4/27/2015, 10:10:40 PM*

  - rev to match latest version of monument


### - 1.4.4 *4/21/2015, 4:21:26 PM*

  - added note about data stubbs
  - Merge pull request #22 from ansble/feature/data-stub
  - collection in place... a little more work on that one and cleaning it up
  - creating the data stub files is working perfectly... just need to get the created file into the app.js file and write some comments in the stubb file
  - added a data folder to the base generator.
  - begining work on #12 stubbed out all the things and now we can start writing the code that lays down the files


### - 1.4.3 *4/21/2015, 2:36:26 PM*

  - Merge pull request #21 from ansble/bug/param
  - Merge pull request #20 from ansble/bug/update-release
  - fixed the param issue... should now laydown the paramed routes in the main file if they are root level
  - updated to latest release of monument


### - 1.4.2 *3/14/2015, 9:49:47 PM*

  - fixed the broken tests... and added in a gulpfile that will restart your app while you are developing it
  - 1.4.1
  - preparing for release of v1.4.1
  - tweaked tests
  - 1.4.0
  - preparing for release of v1.4.4
  - 1.3.4
  - preparing for release of v1.3.4
  - bumped revision to latest monument


### - 1.4.1 *3/12/2015, 11:35:52 AM*

  - tweaked tests


### - 1.4.4 *3/12/2015, 11:30:00 AM*




### - 1.3.4 *3/12/2015, 11:28:50 AM*

  - bumped revision to latest monument
  - 1.3.3
  - preparing for release of v1.3.3
  - tweaks to the gitignore for the bower install location
  - 1.3.2
  - preparing for release of v1.3.2
  - fixed the bug in the 500 error handler
  - 1.3.1
  - preparing for release of v1.3.1
  - updates and cleanup to match the jshint style. Better code better stuff


### - 1.3.3 *Sat Feb 21 2015 15:18:20 GMT-0700 (MST)*

  - tweaks to the gitignore for the bower install location


### - 1.3.2 *Sat Feb 21 2015 14:24:00 GMT-0700 (MST)*

  - fixed the bug in the 500 error handler


### - 1.3.1 *Sat Feb 21 2015 09:07:12 GMT-0700 (MST)*

  - updates and cleanup to match the jshint style. Better code better stuff


# Release History

##v1.1.9

- fixed the main.js home.js bug with / routes
- Merge pull request #8 from ansble/bug/main
- added error templates and example handling for errors
- Merge pull request #9 from ansble/feature/error-handling
- fixed the stub issues closes #5
- Merge pull request #10 from ansble/bug/route-stub
- added some more sugar that accounts for a poorly formed routes.json
- Merge pull request #11 from ansble/bug/route-stub
- 1.1.9

####Files changed:

- generators/app/templates/routes/error.js     | 21 +++++++++++++++++++++
- generators/app/templates/templates/error.jst |  2 ++
- generators/routes/index.js                   | 18 ++++++++++++++----
- package.json                                 |  2 +-
 
 ####Totals:

 4 files changed, 38 insertions(+), 5 deletions(-)