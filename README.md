## Development

Installing stuff for the first time

    npm install

    cd server

    npm install

    cd ../client

    npm install


Start development (after installing everything)

    npm start



## Deployment / Production
### React Client
To deploy the client, run

    npm run build

This will build the client for production into the folder client/build/

You can copy all of these files into an AWS S3 bucket and enable it for static web hosting


### Express API Server

#### AWS Elastic Beanstalk
Follow this tutorial: https://medium.com/@xoor/deploying-a-node-js-app-to-aws-elastic-beanstalk-681fa88bac53

#### Heroku
Follow this tutorial: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up


### Postgres Database
Set up a postgres database with AWS RDS. Set the environment variables that you see in .env when you start up the Express API Server (ex postgres host, username, password, etc)



## Environment files
- setting up dot env files for express: https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html

The .env file in this directory is for development only. It is used in queries.js to connect to the development database. In production, it is ignored, and you should instead set the environment variables through the Heroku CLI

    heroku config:set GITHUB_USERNAME=joesmith

You can read more here: https://devcenter.heroku.com/articles/config-vars


The .env in client/ is used for production only. It is ignored in development. You can read more about that here: https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables



## Tutorials
- setting up react and express: https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
- setting up express and postgres: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8
