const express = require('express');
const app = express(); // this tells our webserver everything it can do
const bodyParser = require('body-parser') // THIS IS TO REPLACE THE CUSTOM BODY PARSER WRITTEN BELOW
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth')

const { request } = require('express');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieSession({
  keys: ['zoP9sj55jJlJpP21zZzeE135'] // this is used for encryption
}));
app.use(authRouter)


// ROUTE HANDLERS BELOW



app.listen(3000, () => {
  console.log('Listening')
})

