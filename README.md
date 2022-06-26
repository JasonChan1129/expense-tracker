# My Restaurant Collections

An expense tracker web application

![project cover](/public/images/demo1.png)
![project cover](/public/images/demo2.png)

## Prerequisites

-  Node.js
-  Register an account for [MongoDB Altas](https://www.mongodb.com/atlas/database)
-  Register an account for [Meta Developers](https://developers.facebook.com/)

## Installation and execution

1. Clone this project with your terminal

```
git clone https://github.com/JasonChan1129/expense-tracker.git
```

2. Install all the required dependencies

```
npm install
```

3. Install nodemon if you don't already have

```
npm i nodemon
```

4. Create a .env file by following .env.example

5. Run the seed data

```
npm run seed
```

6. Start the server

```
npm run dev
```

7. Server runs successfully if the following message is printed.

```
Server is listening to localhost:3000
```

## Features

-  display a list of expense record on the main page, and filter base on category

-  users can create a new expense record

-  users can edit the details of a expense record

-  users can delete a expense record

-  login (includes facebook login) and register function

## Development tools

-  bootstrap @ 4.3.1
-  bcryptjs @ 2.4.3
-  connect-flash @ 0.1.1
-  dotenv @ 16.0.0
-  express @ 4.17.3
-  express-handlebars @ 3.0.0
-  express-session @ 1.17.1
-  font-awesome @ 5.8.1
-  @googlemaps/google-maps-services-js @ 3.3.12
-  @handlebars-helpers @ ^0.10.0
-  method-override @ 3.0.0
-  mongoose @ 5.9.7
-  passport @ 0.4.1
-  passport-facebook @ 3.0.0
-  passport-local @ 1.0.0
-  node.js @ 16.14.2
