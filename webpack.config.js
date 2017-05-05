module.exports = function(env) {
  return require('./webpack.' + process.env.NODE_ENV + '.js')
}
