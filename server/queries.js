//TUTORIAL FOR SETTING UP DOT ENV FILES WITH NODE
//https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
// This code will automatically load the .env file in the root of your project and initialize the values. It will skip any variables that already have been set. You should not use .env files in your production environment though and rather set the values directly on the respective host. Therefore, you might want to wrap your load statement in an if-statement:


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


console.log(process.env.DB_USER);



//TUTORIAL FOR SETTING UP POSTGRES WITH EXPRESS
//https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8

//In a production environment, you would want to put your configuration details in a separate file with restrictive permissions that is not accessible from version control, but for the simplicity of this tutorial, we’re keeping it in the same file as the queries.


const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})


const autoSuggestUsers = (request, response) => {
  const search = "%" + request.params.search + "%"; //add % so that it does substring matching, not exact matching
  console.log(search);
  //ILIKE is case insensitive, LIKE is case insensitive
  pool.query("SELECT * FROM users WHERE name ILIKE $1 LIMIT 5", [search], (error, results) => {
    if (error) {
      response.status(500).json(error)
    }
    else {
      response.status(200).json(results.rows)
    }

  })
}

//export database functions
module.exports = {
  autoSuggestUsers
}
