# NodeTest
Antonio test

Node RestAPI and Test using Mocha.

<pre>npm start</pre> to start RestAPI
<pre>npm test</pre> to test

All code is developed using NodeJs and Postman is used.

----------------------------------------------------------------------
1.- Create a new project with nodejs
1.1.- The project must be initialized with npm
1.2.- Create a github repository for the project
1.3.- Add a linter to the project
1.4.- Initialize a suite to test the project
1.5.- If possible, dockerize the project
1.6.- Submit your change to github

2.- Access to the API documentation.
2.1.- Enter https://hummingbird-staging.podgroup.com/v3/docs/swagger/index.html
2.2.- Create a method in your code to validate your user
POST /auth/token
2.3.- Make a Test this method.
2.4.- Submit your change to github

3.- Create a method that allow to create users in the account
3.1.- Add test to this method
3.2.- Use that test to create some users
3.3.- Submit your change to github

4.- Create a method to list all the assets of the account
4.1.- Add tests in your code
4.2.- Submit your change to github

5.- Create a method to activate an asset
5.1.- Add tests in your code
5.2.- Activate all the assets of the account with the product.
5.3.- Submit your change to github


-----------------------------
USER
-----------------------------
{ username: 'sagar.neupane', password: 'enapuen.ragas' }

-----------------------------
ACCOUNT
-----------------------------
{
  accountName: 'Tecnical Test sagar.neupane',
  accountId: '65e5f451-54e3-45ea-84e9-dcdd8c59078e'
}

-----------------------------
PRODUCT
-----------------------------
{
  name: 'Tecnical Test sagar.neupane Base Product',
  id: '60d45dfd1bfb24002088b2b5'
}
--