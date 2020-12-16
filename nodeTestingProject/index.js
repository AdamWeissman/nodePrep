const thatFileSystem = require('fs'); 
// filesystem from node standard library is abbreviated
// NOTE!!!  the above const is typically stores as fs instead of thatFileSystem, but for learning purposes I think it's more explicity/expressive to store it with a new name

//REMEMBER... no need to declare function because this is imported!!!

//thatFileSystem.readdir('.', (err, filenames) => {
  thatFileSystem.readdir(process.cwd(), (err, filenames) => {


  // EITHER ... err === an error object, or its null which means everything is ok

    if (err) {
      console.log(err);
      return; 
    }

    console.log(filenames)

});

