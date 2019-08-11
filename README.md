# ASAPP chat backend

## Overview
ASAPP chat backend that allows message exchange between users

## Requirements

- docker-compose version 1.23.x

or

- node v10.x
- postgres 9.6
- redis 3.2.x

### Configuration

#### Configuration file

Sensitive configuration vars should be defined in the environment of the container/instance.

For local purposes, you can use the file: ``` env-local.yml ```
That file is read when you run the application through docker-compose

#### Configuration Varibles

Required Variables in configuration file:

```
PORT: Port where the app will be running, example: 8080.
PREFIX: Prefix path for the app, example: `asapp-chat-backend`.
PG_CONNECTION: Connection string for the DB.
```

For more information take a look to the file ```eny-local.yml```

## Run the application

### Docker compose

- Run:

docker-compose up

### NPM Run

- Install dependencies

```
$ cd asapp-chat

$ npm i
```

- Run locally

```$ npm run local```

- Run tests

```$ npm run test```
