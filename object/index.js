var object = module.exports = {}

object.Descriptor = require("./Descriptor")
object.define = new object.Descriptor()
object.for = require("./for")
object.in = require("./in")
object.filter = require("./filter")
object.map = require("./map")
object.extend = require("./extend")
object.merge = require("./merge")
object.defaults = require("./defaults")
object.copy = require("./copy")
