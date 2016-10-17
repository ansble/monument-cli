npm test

npm link

#project base tests
mkdir test-project && cd test-project
cat ../test_stubs/project_answers | monument new .
npm test

#new route test
cat ../test_stubs/routes_test.json > routes.json
npm test

#new data test
cat ../test_stubs/data_obj_answers | monument data obj
cat ../test_stubs/data_coll_answers | monument data coll
npm test
