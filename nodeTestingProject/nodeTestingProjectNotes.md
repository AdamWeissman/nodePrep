# NOTES for this project will be here.

USING `nodejs.org/api` this project will be our own custom version of the "ls" command... it will 1) print out files and folders in the current directory, and also 2) print out files and folders in relative or absolute path.

## USING THE "APP"

just run the file using node from whichever directory you want to get the directory listing for... but you have to run the entire filepath.

OR...

use `npm init -y` to create executable

`chmod +x index.js` to allow persmission of executable

add `#!/usr/bin/env node` to top of the file (in this case index.js) in order to be treated as an executable.  It Tells node to execute the file...

then run `npm link` and can run the file anywhere because of this: 
```
"bin": {
    "gimmeDir": "index.js"
  }
```

adding `npm install chalk` for colorization.  Notice how the package.json changed... and also how `node_modules` received a bunch of dependencies.