'use strict'

var test = require('tape')
var validator = require('../index')
var validateProduct = validator({
  base: './tests/schema/response/product'
})
var validateCustomer = validator({
  base: './tests/schema/response/customer'
})

test('no shared state', function (t) {
  // Testing person schema from example
  // http://json-schema.org/examples.html
  // And product schema from
  // http://json-schema.org/example1.html
  t.plan(4)

  var case1 = validateCustomer({
    firstName: 'Joe',
    lastName: 'Doe',
    age: 35
  }, '/get.json')
  t.equal(case1.valid, true, 'should be valid person')

  var case2 = validateCustomer({
    firstName: 'Joe',
    lastName: 'Doe',
    age: 35
  }, '/get_does_not_exists.json')
  t.equal(case2.valid, null, 'should be return valid null')
  t.equal(case2.errors[0].code, 404, 'should have staus code 404, not found')

  var case3 = validateProduct({
    id: 1,
    name: 'Duck',
    price: 35
  }, '/get.json')
  t.equal(case3.valid, true, 'should be valid item')
})
