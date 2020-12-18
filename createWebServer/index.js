const express = require('express');
const app = express(); // this tells our webserver everything it can do
const bodyParser = require('body-parser') // THIS IS TO REPLACE THE CUSTOM BODY PARSER WRITTEN BELOW
app.use(bodyParser.urlencoded({ extended: true}));


// ROUTE HANDLERS BELOW
app.get('/', (request, response) => {
  response.send(`
  <br>
  <br>
  <br>
  <center>
    <div>
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

// THE CODE BELOW IS REPLACED BY REQUIRE STATEMENT ABOVE
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

app.post('/', (request, response) => { //bodyParser is globally applied with app.use on line 4
  console.log(request.body)
  response.send('ACCOUNT CREATED!!!')
})


app.listen(3000, () => {
  console.log('Listening')
})

