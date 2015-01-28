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