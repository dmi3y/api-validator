'use strict'

var test = require('tape')
var validator = require('../index')({
  base: './tests/schema'
})

test('$ref test', function (t) {
  t.plan(4)

  var case1 = validator({
    customer: {
      firstName: 'Joe',
      lastName: 'Doe',
      age: 35
    },
    goods: [
      {
        id: 1,
        name: 'Duck',
        price: 35
      }
    ]
  }, '/response/cart/get.json')
  t.equal(case1.valid, true, 'should pass')

  var case2 = validator({
    customer: {
      firstName: 'Joe',
      age: 35
    },
    goods: [
      {
        id: 1,
        name: 'Duck',
        price: 35
      }
    ]
  }, '/response/cart/get.json')
  var actualError1 = case2.errors[0].message
  var expectedError1 = 'Missing required property: lastName'
  t.equal(actualError1, expectedError1, 'should fail because of the missing last name')

  var case3 = validator({
    customer: {
      firstName: 'Joe',
      lastName: 'Doe',
      age: 35
    },
    goods: [
      {
        name: 'Duck',
        price: 35
      }
    ]
  }, '/response/cart/get.json')
  var actualError2 = case3.errors[0].message
  var expectedError2 = 'Missing required property: id'
  t.equal(actualError2, expectedError2, 'should fail because of the missing id')
  t.equal(case3.errors.length, 1, 'should have only one error')
})
