'use strict'
// load everything upfront
// + lazy loading under consideration

var Tv4 = require('tv4')
var glob = require('glob')
var fs = require('fs')

module.exports = function (config) {
  var tv4 = Tv4.freshApi()
  var base = config.base || './'
  var globPattern = config.globPattern || '/**/*'
  var schemaPaths = glob.sync(base + globPattern)

  schemaPaths.forEach(function (el) {
    var stat = fs.statSync(el)

    if (stat.isFile()) {
      var path = el.replace(base, '')
      var schema = fs.readFileSync(el).toString()

      try {
        var schemaJson = JSON.parse(schema)
      } catch (e) {
        console.log(`Error when parsing schema ${path}.`)
        throw (e)
      }
      tv4.addSchema(path, schemaJson)
    }
  })

  schemaPaths = null
  return {
    tv4
  }
}
