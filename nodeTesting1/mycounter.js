let counter = 0

module.exports = {
  incrementCounter() {
    counter = counter + 1;
    return ("increased")
  },
  getCounter() {
    return counter
  }
};