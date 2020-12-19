const fs = require('fs')
const crypto = require('crypto')
const util = require('util')

const scrypt = util.promisify(crypto.scrypt)


class UsersRepository {
  constructor (filename) {
    if (!filename) {
      throw new Error('createing a repo requires a filename')
    }

    this.filename = filename
    try {
      fs.accessSync(this.filename)
    } catch (err) {
      fs.writeFileSync(this.filename, '[]')
    }
  }

  // async checkForFile() {} // this line was for testing..

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8'
      })
    );
  }

  async create(attrs) {
    attrs.id = this.randomId()
    // { email: '', pw: '' } <-- this is what it looks like behind the scene, and an id is added automatically
    
    const salt = crypto.randomBytes(8).toString('hex');
    const hashed = await scrypt(attrs.pw, salt, 64) //scrypt at top
    
    const records = await this.getAll();
    const record = {
      ...attrs,
      pw: `${hashed.toString('hex')}.${salt}`
    };
    records.push(record)
    
    await this.writeAll(records)
    
    return attrs;
    
  }

  async comparePasswords(saved, supplied) {

    const [hashed, salt] = saved.split('.');
    const hashedSupplied = await scrypt(supplied, salt, 64) // this returns the buffer/derived key
    
    return hashed === hashedSupplied.toString('hex') //hashed is more accurately described as a buffer
  }


  async writeAll(recs) {
    await fs.promises.writeFile(this.filename, JSON.stringify(recs, null, 2)) // null is a custom formatter argument, and 2 designates how much indentation to use
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex')
  }

  async getOne(id) {
    const records = await this.getAll()
    return records.find((record) => {return record.id === id})
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => {
      return record.id !== id
    })
    await this.writeAll(filteredRecords)
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => {return record.id === id})

    if (!record) {
      throw new Error('Record with id ${id} is not found')
    } 
    Object.assign(record, attrs); //takes attrs and copies them onto the record object
    await this.writeAll(records) // record is now updated, so this.writeAll(records) sends to database
  }

  async getOneBy(filterObj) {
    const records = await this.getAll();

    for (let record of records) { //outer "for of" loop iterating through values in an array
      let found = true;

      for (let key in filterObj) { // inner "for in" loop iterating through the keys
        if (record[key] !== filterObj[key]) {
          found = false;
        }
      }

      if (found) {
        return record
      }
    }
  }

}

// const test = async () => {
//   const repo = new UsersRepository('users.json'); 
  //await repo.create({ email: 'test@test.com', pw: '1234', pwConfirm: '1234'})
  //await repo.update('6882f87c', { pw: '5678', pwConfirm: '5678'})
  //const users = await repo.getAll()
  //const user = await repo.getOne()
  //const user = await repo.getOneBy({ email: 'test@test.com', pw: '1234'})
  //await repo.delete('6105d362')
  //console.log(user)
//}
//test()



//module.exports = UsersRepository

//ANOTHER FILE would have to respond to the above with...

// const UsersRepository = require('./users');
// const repo = new UsersRepository('users.json')

// INSTEAD, USE THE FOLLOWING

module.exports = new UsersRepository('users.json')

// ANOTHER FILE COULD THEN USE...
// const repo = require('./users)
// repo.getAll()
// repo.getOne() etc...