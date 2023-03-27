# Szpytma's House of Games API

## Background

This will be an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real-world backend service (such as Reddit) which should provide this information to the front-end architecture.

The database will be PSQL, and it will be possible to interact with it using [node-postgres](https://node-postgres.com/).

To see that project please

1. run npm i / npm install to initialize all needed dependencies
2. create .env files for the dev and test data in the root of the project folder (env.development, .env.test).
   Each file should have _PGDATABASE_ set up to the database
   _PGDATABASE=nc_games / PGDATABASE=nc_games_test_

3. Run _npm run setup-dbs_ to create a test and dev database locally
4. Run _npm run seed_ to insert data into previously created database
