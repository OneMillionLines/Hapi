var a = function () {
  console.log("Hello World")
}

var b = function () {
  console.log("I am not exposed")
}

module.exports = {
  a
};