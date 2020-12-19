# THESE NOTES PICK UP WHERE THE NOTES IN CREATEWEBSERVER left off...

## THE BETTER STRUCTURE

```
PROJECT FOLDER
    
  repositoriesFolder
    users.js

  routesFolder
    adminFolder
        auth.js

  viewsFolder
    adminFolder
      authFolder
        signin.js
        signup.js

```

1) Inside of auth.js, be mindful to correctly route to the usersRepo...  
  - `const usersRepo = require('../../repositories/users');`  
  - and `module.exports = router`
  - replaced instances of `app.get` etc with `router.get`

2) Inside of index.js...  
  - `const authRouter = require('./routrs/admin/auth')`
  - `app.use(authRouter)` to gain access to the subroutes
  
3) Create Some Basic HTML Templates in VIEWS ...  
  - use the following for default export of "simple component"  
  NOTE: the argument that's being exported in the object needs to be the same as where it's being used ... almost like a named property. 
  ```
    module.exports = ( {objectNeedsToBeSameAsThis}) => {
      return `
        this is a template literal 
        with the HTML code for whatever 
        needs to be returned
      `;
    }
  ```  
   SEE BELOW...

  ```
  router.get('/signup', (objectNeedsToBeSameAsThis, response) => {
    response.send(signupTemplate({ objectNeedsToBeSameAsThis })) // this must match above...
  });
  ```
4) MAKE SURE TO USE A LAYOUT to wrap the other templates... for example:  
  ```
  const layout = require('../layout')

  module.exports = ( {requestObject} ) => {
  return layout({
    content: `
      <br>
      <br>

  etc etc...
  ```