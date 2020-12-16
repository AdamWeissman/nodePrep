## OVERVIEW

This is a GitHub Repo to help learn and understand Node.js.  Whether it's your first time working with Node, or to serve as a refresher.  As I personally have only worked with Node.js on a tutorial project, this was created in the spirit of learning. --AW 12/16/2020

## KEY POINTS
JavaScript is executed by adding script tags to an HTML Document whereas with Node, JS is executing by running the NODE CLI FROM THE TERMINAL.

There is no DOM, and therefore no access to any Window related objects.

Each file within Node is its own world, whereas with regular JavaScript, code can reference variables in other files freely.

Libraries in Node are included by using the Node Package Manager whereas for browser based JavaScript, you can use script tags etc.

type `node` to enter the Node repl and explore!

## DEBUGGING IN NODE
* `node inspect index.js`  
  this starts a debugger in the CLI and pauses execution whenever debugger is hit  

  `c` continues execution, `n` runs the next line of code, `s` steps into a function, `o` steps out of current function
*  `node --inspect index.js`  
  starts a debugger instance and pauses execution when the `debugger` statement is hit... can access the debugger at 'chrome://inspect'

*  `node --inspect-brk index.js`  
  starts a debugger instance and WAITS to execute until a debugger is connected... also access it at 'chrome://inspect' 
