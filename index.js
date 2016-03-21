'use strict'

var validator = require('./validator')

module.exports = function (config) {
  var myValidator = validator(config)
  myValidator.tv4.addFormat(config.formats)

  return function (json, path) {
    var schema = myValidator.tv4.getSchema(path)
    if (schema) {
      var result = myValidator.tv4.validateMultiple(json, schema)
    } else {
      result = {
        error: `Schema ${path}, is not exists.`,
        code: 404,
        valid: null
      }
    }

    return result
  }
}
