'use strict'

var test = require('tape')
var validator = require('../index')({
  base: './tests/schema'
})

var schemaPath = '/response/customer/get.json'

test('basic usecase', function (t) {
  // Testing person schema from example
  // http://json-schema.org/examples.html
  t.plan(2)

  var case1 = validator({
    firstName: 'Joe',
    lastName: 'Doe',
    age: 35
  }, schemaPath)
  // this should pass
  t.equal(case1.valid, true, 'should be valid person')

  var case2 = validator({
    firstName: 'Joe',
    age: 35
  }, schemaPath)
  // this should fail
  t.equal(case2.valid, false, 'should fail because no lastName')
})
