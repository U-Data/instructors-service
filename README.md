# Project Name

> Instructors/Related Courses Module for Udemy-Like Product Page

## API

| Endpoint             | Method  | Description
| -------------------- | ------- | -----------
| /courses/:id         | GET     | Retrieve course by id
| /:id/instructors     | GET     | Retrieve instructors by course id
| /courses             | POST    | Add a new course to DB
| /courses             | PATCH   | Update the last course's full price
| /courses             | DELETE  | Delete the last course

## Usage

Before seeding the database:

mysql -u root -p [Enter password]
create database inst;

To seed database:
node database/seed.js

To start server:
node server/index.js

To build:
npm react-dev

To test:
npm test