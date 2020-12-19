const express = require('express');
const app = express(); // this tells our webserver everything it can do
const bodyParser = require('body-parser') // THIS IS TO REPLACE THE CUSTOM BODY PARSER WRITTEN BELOW
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');
const { request } = require('express');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieSession({
  keys: ['zoP9sj55jJlJpP21zZzeE135'] // this is used for encryption
}));



// ROUTE HANDLERS BELOW
app.get('/signup', (request, response) => {
  response.send(`
  <br>
  <br>
  <br>
  <center>
    <div>
    YOUR ID IS: ${request.session.someUserID}
      <form method="POST">
        <input name="email" placeholder="email" /><br>
        <input name="pw" placeholder="password" /><br>
        <input name="pwConfirm" placeholder="confirm password" /><br>
        <button>SIGN UP</button
      </form>
    </div>
  </center>
  `)
});

app.post('/signup', async (request, response) => { //bodyParser is globally applied with app.use on line 4
  const { email, pw, pwConfirm } = request.body
  
  const existingUser = await usersRepo.getOneBy( { email: email }); //can use  { email } instead because the name is the same as the value 
  if (existingUser) {
    return response.send('EMAIL IN USE');
  }

  if (pw !== pwConfirm) {
    return response.send('PASSWORDS MUST MATCH');
  }


  const user = await usersRepo.create({ email, pw});

  request.session.someUserID = user.id // this added by the cookieSession

  response.send('ACCOUNT CREATED!')
})

app.get('/signout', (request, response) => {
  request.session = null
  response.send("You are logged out");
})

app.get('/signin', async (request, response) => {
  response.send(`
  <br>
  <br>
  <br>
  <center>
    <div>
    YOUR ID IS: ${request.session.someUserID}
      <form method="POST">
        <input name="email" placeholder="email" /><br>
        <input name="pw" placeholder="password" /><br>
        <button>SIGN IN</button
      </form>
    </div>
  </center>
  `);
})

app.post('/signin', async (request, response) => {
  const { email, pw } = request.body; //LOVE THAT DESTRUCTURING!!

  const user = await usersRepo.getOneBy({ email })  // { email } is equivalent to { email: email}

  if (!user) {
    return response.send("EMAIL NOT FOUND")
  } 

  if (user.pw !== pw) {
    return response.send('INVALID PASSWORD');
  }

  request.session.someUserID = user.id;
  response.send("YOU ARE NOW LOGGED IN")
});


app.listen(3000, () => {
  console.log('Listening')
})





// THE CODE BELOW IS REPLACED BY REQUIRE STATEMENT AT THE TOP
// const bodyParser = (request, response, next) => {
//   if (request.method === 'POST') {
//     request.on('data', data => {
//       const parsed = data.toString('utf8').split('&') 
//       const formData = {};
//       for (let pair of parsed) {
//         const [key, value] = pair.split('='); //some destructuring, first val is key, second val is value
//         formData[key] = value
//       }
//       request.body = formData
//       next()
//     });
//   } else {
//     next(); 
//   }
// }

// THIS IS ADDED LOCALLY... prior to adding bodyParser being added globally...
// app.post('/', bodyParser.urlencoded({ extended: true }), (request, response) => { //bodyParser is a middleware
//   console.log(request.body)
//   response.send('ACCOUNT CREATED!!!')
// })