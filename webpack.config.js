module.exports = function(env) {
  return require('./config/webpack.' + process.env.NODE_ENV + '.js')
}
