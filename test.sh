npm test

npm link

#project base tests
mkdir test-project && cd test-project
cat ../test_stubs/project_answers | monument new .
npm test
