// to run me... node index.js
// OR... enter the node repl 

// NOTE can define the incoming variable however I want
// side note (./ means in the current directory)
const theMessage = require('./myScript.js');
const message = require('./myScript.js');

const counterObj = require('./mycounter.js')

//console.log(theMessage);
//console.log(message);

/*
NOTICE BELOW!!!!
although you instantiate a new object, require cache prevents the object from being reinstated...
The object is the same, though it is named differently...
*/


console.log("get counter", counterObj.getCounter())
console.log("increment counter", counterObj.incrementCounter())
console.log("get counter",counterObj.getCounter())

const newCounterObj = require('./mycounter.js')
console.log("new get counter", newCounterObj.getCounter())
console.log("new increment counter", newCounterObj.incrementCounter())
console.log("new get counter", newCounterObj.getCounter())


//console.log(require.cache)
// this shows us everything that's coming through
// console.log(arguments)
// can actually console log anything, like so
// console.log(require) 
// also useful to use __filename or __dirname with console.log or in general

