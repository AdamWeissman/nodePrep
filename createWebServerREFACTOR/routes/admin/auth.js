const express = require('express')
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup')

const router = express.Router();

router.get('/signup', (requestObject, response) => {
  response.send(signupTemplate({ requestObject })) // request is actually the requestObject
});

router.post('/signup', async (request, response) => { //bodyParser is globally applied with app.use on line 4
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

router.get('/signout', (request, response) => {
  request.session = null
  response.send("You are logged out");
})

router.get('/signin', async (request, response) => {
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

router.post('/signin', async (request, response) => {
  const { email, pw } = request.body; //LOVE THAT DESTRUCTURING!!

  const user = await usersRepo.getOneBy({ email })  // { email } is equivalent to { email: email}

  if (!user) {
    return response.send("EMAIL NOT FOUND")
  } 

  const validPassword = await usersRepo.comparePasswords(
    user.pw,
    pw
  )

  if (!validPassword) {
    return response.send('INVALID PASSWORD');
  }

  request.session.someUserID = user.id;
  response.send("YOU ARE NOW LOGGED IN")
});

module.exports = router;