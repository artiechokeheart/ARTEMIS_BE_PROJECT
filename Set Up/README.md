# Northcoders News API

This API is for, what I would call, the backend for a message board, but to put it into more modern lingo--it is a "Reddit-Like" news sharing website where users can view and interact with each others articles.

Click [here](https://artemis-be-news.onrender.com/api) for a link to the hosted version of this API where you will be able to see the API in action as well as a list of endpoints.

## Setting up

### Cloning

For anyone wishing to run this project locally, you will firstly need to clone the repo.

You can either clone the repo and initalise your own git repo, or you can fork the repo from git and clone it.

In your terminal, go to your desired directory and enter:

    git clone https://github.com/artiechokeheart/ARTEMIS_BE_PROJECT.git

Open your newly cloned repo.

If you are creating your own repo, you will need to set one up on GitHub and not initialise the project with a readme, .gitignore or license.

Then use the following commands:

    git remote set-url origin YOUR_NEW_REPO_URL_HERE
    git branch -M main
    git push -u origin main

### Enviromental variables

In order for this projet to run, you will need to create two .env files: .env.test and .env.development in your root directory.

Into each, add PGDATABASE=, with the correct database name for that environment (see [/db/setup.sql](../db/setup.sql) for the database names).

[Example](./.env-example)

    PGDATABASE=database_name_here

Remember to save and check that these .env files are .gitignored.

### Downloading dependancies

Now download the required dependancies.

    npm install

The minimum versions of Node.js, and Postgres needed to run the project are
Node "version":"4.0.8" and Postgres "version": "8.0"

### Databases

Start by running setup-dbs

    npm run setup-dbs

Then seed the data with

    npm run seed

## Testing

Testing for this API has been done with [Jest](https://jestjs.io/docs/getting-started). Testing will use the test data and database and will re-seed every time tests are run.

To run all tests use

    npm run test

To run tests once for a specific file, you can optionally add the file name

    npm run test js_file_name

Jest can also be run continuously (run every time changes are saved to the tested JS files) by using

    npm run test-cont

---

<br />

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
