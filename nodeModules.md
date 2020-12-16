# IMPORTING AND EXPORTING

for this example... inside of nodeTesting1/index.js  
   `const message = require('./myScript.js')`  
AND... respectively... inside of nodeTesting1/index.js  
   `module.exports = helloMessage`  
alternately, I could export an actual string instead of a variable

## BEHIND THE SCENES... THE ABOVE CODE REALLY DOES THIS:

```
function(exports, require, module, __filename, __dirname) {
  const theMessage = require('./myscript.js);

  console.log(theMessage)
}
```

The FIVE Arguements above:
-exports  
  functionally equivalnt to `module.exports` but `module.exports` is used more frequently because it's easier and satisfies an edge case
-require  
  a function that get access to the exports of another file
-module  
  an object that defines some properties and info about the current file
-__filename  
  full path plus the file name
-__dirname  
  full path of THEE file