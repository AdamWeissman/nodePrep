# IMPORTING AND EXPORTING

for this example... inside of nodeTesting1/index.js
  `const message = require('./myScript.js')`
\n AND... respectively... inside of nodeTesting1/index.js
  `module.exports = helloMessage`
  alternately, I could export an actual string instead of a variable

## BEHIND THE SCENES... THE ABOVE CODE REALLY DOES THIS:

```
function(exports, require, module, __filename, __dirname) {
  const theMessage = require('./myscript.js);

  console.log(theMessage)
}
```
