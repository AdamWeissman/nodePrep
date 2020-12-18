const fs = require('fs')
const crypto = require('crypto')

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

    const records = await this.getAll();
    records.push(attrs);
    
    await this.writeAll(records)
    
  }

  async writeAll(recs) {
    await fs.promises.writeFile(this.filename, JSON.stringify(recs, null, 2)) // null is a custom formatter argument, and 2 designates how much indentation to use
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex')
  }

}

const test = async () => {
  const repo = new UsersRepository('users.json'); 
  
  await repo.create({ email: 'test@test.com', pw: '1234', pwConfirm: '1234'})

  const users = await repo.getAll()

  console.log(users)
}

test()