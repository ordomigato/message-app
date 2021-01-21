# Messaging app

This project uses React, Material-UI, React-Router, Node, Express.js, Socket.io, and Sequelize.

## Getting started

The project is broken down into a client and server folder.

## Backend Build Setup

The below instructions require [Sequelize-CLI](https://github.com/sequelize/cli "Sequelize-CLI on github").

```bash
$ npm install -g sequelize-cli
```

Before continuing, create a .env file in `./server` and fill out the following.

```bash
DB_USER=postgres
DB_PASS=password
DB_NAME=message_db
DB_HOST=127.0.0.1
```

After, run these commands to setup the backend and database.

```bash
# install server dependencies in ./server
$ npm install

# create database
$ sequelize db:create

# migrate database
$ sequelize db:migrate

# run server
$ npm run dev
```

## Frontend Build Setup

```bash
# install dependencies
$ npm install

# run application
$ npm run start
```
