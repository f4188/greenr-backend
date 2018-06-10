var User = require("./../models/users_model.js")

var uid = function(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var db_error = function (res, err) {
      return res.json({status:"error", message:"error during database transaction execution", database_err: err})
}

var send = function (res, status, message) {
	return res.json({status:status, message:message})
}


var isUnique = function (type, value, callback) {
  var query;
  query = {type:value}
  console.log(query)
  User.findOne(query,  function(err, result) {
    if (err) return callback(err);
    else
    {
      console.log(result)
    return callback(err,result)
    }
  })

}

module.exports.db_error = db_error
module.exports.send = send
module.exports.isUnique = isUnique
module.exports.uid = uid
