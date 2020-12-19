module.exports = ( {requestObject} ) => {
  return `
  <br>
  <br>
  <br>
  <center>
    <div>
    YOUR ID IS: ${requestObject.session.someUserID}
      <form method="POST">
        <input name="email" placeholder="email" /><br>
        <input name="pw" placeholder="password" /><br>
        <input name="pwConfirm" placeholder="confirm password" /><br>
        <button>SIGN UP</button
      </form>
    </div>
  </center>
  `;
};