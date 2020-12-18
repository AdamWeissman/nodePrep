const fs = require('fs')

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
    const records = await this.getAll();
    records.push(attrs);
    
    await fs.promises.writeFile(this.filename, JSON.stringify(records))

  }

}

const test = async () => {
  const repo = new UsersRepository('users.json'); 
  
  await repo.create({ email: 'test@test.com', pw: '1234', pwConfirm: '1234'})

  const users = await repo.getAll()

  console.log(users)
}

test()