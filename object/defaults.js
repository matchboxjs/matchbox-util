var copy = require("./copy")

module.exports = function defaults (options, defaults) {
  if (!options) {
    return defaults
  }

  var obj = copy(options)

  for (var prop in defaults) {
    if (defaults.hasOwnProperty(prop) && !options.hasOwnProperty(prop)) {
      obj[prop] = defaults[prop]
    }
  }

  return obj
}
