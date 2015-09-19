var Descriptor = require("./Descriptor")
var object = module.exports = new Descriptor()

object.for = function( obj, callback ){
  for( var prop in obj ){
    if( obj.hasOwnProperty(prop) ){
      callback(prop, obj)
    }
  }
  return obj
}
