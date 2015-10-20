module.exports = function( obj, callback ){
  for( var prop in obj ){
    if( obj.hasOwnProperty(prop) ){
      callback(obj[prop], prop, obj)
    }
  }
  return obj
}
