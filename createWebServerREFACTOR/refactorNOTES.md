# THESE NOTES PICK UP WHERE THE NOTES IN CREATEWEBSERVER left off...

## THE BETTER STRUCTURE

```
PROJECT FOLDER
    
  repositoriesFolder
    users.js

  routesFolder
    adminFolder
        auth.js

```

1) Inside of auth.js, be mindful to correctly route to the usersRepo...  
  - `const usersRepo = require('../../repositories/users');`  
  - and `module.exports = router`
  - replaced instances of `app.get` etc with `router.get`

2) Inside of index.js...  
  - `const authRouter = require('./routrs/admin/auth')`
  - `app.use(authRouter)` to gain access to the subroutes
