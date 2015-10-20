module.exports = function( obj, callback ){
  var ret = {}
  for( var prop in obj ){
    if( obj.hasOwnProperty(prop) ) {
      ret[prop] = callback(obj[prop], prop, obj)
    }
  }
  return ret
}
