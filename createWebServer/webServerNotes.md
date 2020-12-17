# PROJECT SETUP

## BASICS
1) Run `npm init -y` to get a package.json
2) common installs express and nodemon...  
  `npm install express nodemon` 
3) Inside of the package.json alter the scripts to the folloing:
```
 "scripts": {
    "dev": "nodemon index.js"
  },
```  
4) `npm run dev` runs `nodemon index.js`

## WEB SERVER SETUP (cont'd from above...)

5) The basic setup is like so... 
```
const express = require('express');
const app = express(); // this tells our webserver everything it can do

// ROUTE HANDLERS BELOW
app.get('/', (request, response) => { //GET IS THE METHOD REQUEST
  response.send(` // must use backticks
      <form method="POST"> //method changed to POST 
        <input name="email" placeholder="email" /><br>
        <input name="pw" placeholder="password" /><br>
        <input name="pwConfirmation" placeholder="confirm password" /><br>
        <button>SIGN UP</button
      </form>
  `) // make sure to use backticks to include HTML
});



app.listen(3000, () => { // NOTE THAT 3000 could be whatever host you want
  console.log('Listening')
})
```

6) FOR HTML PARSING... MAKE SURE TO INCLUDE THE FOLLOWING MIDDLEWARE ALONG WITH THE OTHER REQUIRES...
```
  const bodyParser = require('body-parser') // THIS IS TO REPLACE THE CUSTOM BODY PARSER WRITTEN BELOW
  app.use(bodyParser.urlencoded({ extended: true}));
```