

### Introduction

This is a node.js express mongodb app. In this backend app we use the MVC design pattern to make it easy to mantain and scale this project.

This app is about a database on restaurants with different characteristics. 

People can check nearby restaurant, with ratings so that people can compare them.


### Instructions for running this app.

1) clone this repo by using:
git clone https://github.com/anselmostitla/Restaurant-mongo-express-nodejs.git

2) Run this command to install dependencies:
npm install

3) Please get your mongo URI password from mongodb.com and put it on a new .env file

4) To run the aplication it is enought to put
npm run dev (this will run nodemon index.js)

5) You can use thunder client or postman to test this app

### You can test the following end points

http://localhost:4000

http://localhost:4000/restaurants/statistics/19.4329125180636/-99.1312/0.005


 