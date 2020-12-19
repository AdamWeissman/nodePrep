const layout = require('../layout')

module.exports = ( {requestObject} ) => {
  return layout({
    content: `
      <br>
      <br>
      <br>
      <center>
        <div>
        YOUR ID IS: ${requestObject.session.someUserID}
          <form method="POST">
            <input name="email" placeholder="email" /><br>
            <input name="pw" placeholder="password" /><br>
            <button>SIGN IN</button
          </form>
        </div>
      </center>
    `
  });
}