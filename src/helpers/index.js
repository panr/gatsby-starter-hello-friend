module.exports.toKebabCase = function(value) {
  return value.replace(new RegExp('(\\s|_|-)+', 'gmi'), '-')
}
