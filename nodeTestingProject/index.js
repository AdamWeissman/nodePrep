#!/usr/bin/env node
const util = require('util') // need this for promisify
const chalk = require('chalk')

const thatFileSystem = require('fs'); 
// filesystem from node standard library is abbreviated
// NOTE!!!  the above const is typically stores as fs instead of thatFileSystem, but for learning purposes I think it's more explicity/expressive to store it with a new name

const { lstat } = thatFileSystem.promises;
//NOTE!!!  the above extraction from thatFileSystem would normally be from 'fs'

//REMEMBER... no need to declare function below because this is imported!!!

//thatFileSystem.readdir('.', (err, filenames) => {
  thatFileSystem.readdir(process.cwd(), async (err, filenames) => {

  // EITHER ... err === an error object, or its null which means everything is ok

    if (err) {
      console.log(err);
    }

    const statPromises = filenames.map(filename => {
      return lstat(filename);
    });

    const allStats = await Promise.all(statPromises)

    for (let stats of allStats) {
      const index = allStats.indexOf(stats);

      console.log(filenames[index], stats.isFile())
    }

});

