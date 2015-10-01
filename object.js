var Descriptor = require("./Descriptor")
var object = module.exports = new Descriptor()

object.for = function( obj, callback ){
  for( var prop in obj ){
    if( obj.hasOwnProperty(prop) ){
      callback(obj[prop], prop, obj)
    }
  }
  return obj
}

object.in = function( obj, callback ){
  for( var prop in obj ){
    if( obj.hasOwnProperty(prop) ){
      callback(prop, obj[prop], obj)
    }
  }
  return obj
}
