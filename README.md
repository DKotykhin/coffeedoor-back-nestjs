# CoffeeDoor online shop

![Logo](https://coffeedoor-next14-sql.vercel.app/logo_700x191.webp)

## Description

Backend part for CoffeeDoor online shop

## Technologies

-   NestJS, TypeORM, postgreSQL, Typescript, AWS S3, JWT, bcrypt, passport, sendGrid

## Features

-   CRUD for menu categories and menu items based on roles
-   CRUD for store categories and store items based on roles
-   upload images for store items using AWS S3 service
-   role based authentication with JWT strategy and bcrypt for password hash
-   restore and update password with email token notification
-   email confirmation for registration
-   get store item with other items random recommendation
-   change position for menu and store items
-   upload and delete user avatar
-   user orders with telegram channel notification

## Environment Variables

To run this project locally, you will need to add the following environment variables to your .env file. See in .env.example in root directory

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Author

Dmytro Kotykhin
-   [Github](https://github.com/DKotykhin)
-   [Web](https://dmytro-kotykhin.space)
-   [LinkedIn](https://www.linkedin.com/in/dmytro-kotykhin-4683151b)
