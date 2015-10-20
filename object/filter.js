module.exports = function( obj, callback ){
  var ret = {}
  for( var prop in obj ){
    if( obj.hasOwnProperty(prop) ){
      if (callback(obj[prop], prop, obj)) {
        ret[prop] = obj[prop]
      }
    }
  }
  return ret
}
