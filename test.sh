npm test
npm link

rm -rf test-project || true

#project base tests
echo ""
echo "-------------------------------------------------------"
echo "Testing the base project scaffold"
echo "-------------------------------------------------------"
mkdir test-project && cd test-project
echo $PWD
cat ../test_stubs/project_answers | monument new .
npm test

#new route test
echo ""
echo "-------------------------------------------------------"
echo "Testing the new route project scaffold"
echo $PWD
echo "-------------------------------------------------------"
cat ../test_stubs/routes_test.json > routes.json
monument routes
npm test

#new data test
echo ""
echo "-------------------------------------------------------"
echo "Testing the new data project scaffold"
echo "-------------------------------------------------------"
cat ../test_stubs/data_obj_answers | monument data obj
cat ../test_stubs/data_coll_answers | monument data coll
npm test


# #project base tests
# echo ""
# echo "-------------------------------------------------------"
# echo "Testing the base project scaffold with handlebars"
# echo "-------------------------------------------------------"
# cd .. && rm -rf test-project
# mkdir test-project && cd test-project
# cat ../test_stubs/project_answers_handlebars | monument new .
# npm test
