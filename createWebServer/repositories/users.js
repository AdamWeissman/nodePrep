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
    return contents = JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8'
      })
    );
  }
}

const test = async () => {
  const repo = new UsersRepository('users.json'); 
  const users = await repo.getAll()

  console.log(users)
}

test()