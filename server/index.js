//https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const db = require('./queries'); //import database functions
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());




app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API', test: "test", host: process.env.DB_HOST })
})


app.get('/autoSuggestUsers/:search', db.autoSuggestUsers)

app.listen(port, () => console.log(`Listening on port ${port}`));
