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

5) The basic setup is like so...  check the repo folders for more details.
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

# DATA STORAGE NON-PRODUCTION GRADE, BUT ILLUSTRATIVE FOR CRUD

### REPOSITORY APPROACH VS ACTIVE RECORD APPROACH...
* REPOSITORY  
  a single class( repo ) is responsible for data access, and all the records are stored/accessed as plain JS objects

* "ACTIVE RECORD"  
  every record is an instance of a 'model' class that has methods to save, update, delete (general CRUD etc)

7) For quick testing (NOT FOR PRODUCTION) create a `repositories` folder and create an object... check out the repositories folder within this directory, the users.js file for a specific/comprehensive example.  
  NOTE: need to do `node users.js` from inside the repositories folder to generate a users.json

8) Install a 3rd party package to manage cookies `npm install cookie-session`  
  set the cookie on the post request  
  TIP: BE MINDFUL TO CREATE:
    * SIGN UP (get/post) 
    * SIGN IN (get/post)
    * SIGN OUT (get)

9) Make sure to both HASH and SALT the passwords


