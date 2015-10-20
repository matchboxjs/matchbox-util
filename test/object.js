var chai = require("chai")
var assert = chai.assert
var object = require("../object")

var TEST_PROP_NAME = "hello"
var WRITABLE = true
var ENUMERABLE = true
var CONFIGURABLE = true
var NOT_WRITABLE = false
var NOT_ENUMERABLE = false
var NOT_CONFIGURABLE = false

function testDescriptor (obj, writable, enumerable, configurable) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, TEST_PROP_NAME)
  if (typeof writable     == "boolean") writable     ? assert.isTrue(descriptor.writable     ) : assert.isFalse(descriptor.writable     )
  if (typeof enumerable   == "boolean") enumerable   ? assert.isTrue(descriptor.enumerable   ) : assert.isFalse(descriptor.enumerable   )
  if (typeof configurable == "boolean") configurable ? assert.isTrue(descriptor.configurable ) : assert.isFalse(descriptor.configurable )
}

function testIntegrity (descriptor, writable, enumerable, configurable) {
  writable     ? assert.isTrue(descriptor._writable)      : assert.isFalse(descriptor._writable)
  enumerable   ? assert.isTrue(descriptor._enumerable)    : assert.isFalse(descriptor._enumerable)
  configurable ? assert.isTrue(descriptor._configurable ) : assert.isFalse(descriptor._configurable)
}

function descriptor (name, descriptor, writable, enumerable, configurable) {
  it(name, function () {
    testIntegrity(descriptor, writable, enumerable, configurable)
  })
}

function api (name, descriptor, method, args, writable, enumerable, configurable) {
  it(name, function () {
    var obj = {}
    descriptor[method].apply(descriptor, [obj, TEST_PROP_NAME].concat(args))
    testDescriptor(obj, writable, enumerable, configurable)
  })
}

describe("object", function () {
  describe("descriptor", function () {
    descriptor("default", object.define, NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("writable", object.define.writable, WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("enumerable", object.define.enumerable, NOT_WRITABLE, ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("configurable", object.define.configurable, NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    descriptor("writable.enumerable", object.define.writable.enumerable, WRITABLE, ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("enumerable.writable", object.define.enumerable.writable, WRITABLE, ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("writable.configurable", object.define.writable.configurable, WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    descriptor("configurable.writable", object.define.configurable.writable, WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    descriptor("enumerable.configurable", object.define.enumerable.configurable, NOT_WRITABLE, ENUMERABLE, CONFIGURABLE)
    descriptor("configurable.enumerable", object.define.configurable.enumerable, NOT_WRITABLE, ENUMERABLE, CONFIGURABLE)
  })

  describe("accessor", function () {
    function getter () {}
    function setter () {}

    api("accessor", object.define, "accessor", [getter, setter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.accessor", object.define.writable, "accessor", [getter, setter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.accessor", object.define.enumerable, "accessor", [getter, setter], null, ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.accessor", object.define.configurable, "accessor", [getter, setter], null, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.accessor", object.define.enumerable.configurable, "accessor", [getter, setter], null, ENUMERABLE, CONFIGURABLE)
  })
  describe("getter", function () {
    function getter () {}

    api("accessor", object.define, "accessor", [getter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.accessor", object.define.writable, "accessor", [getter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.accessor", object.define.enumerable, "accessor", [getter], null, ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.accessor", object.define.configurable, "accessor", [getter], null, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.accessor", object.define.enumerable.configurable, "accessor", [getter], null, ENUMERABLE, CONFIGURABLE)
  })

  describe("setter", function () {
    function setter () {}

    api("accessor", object.define, "accessor", [setter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.accessor", object.define.writable, "accessor", [setter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.accessor", object.define.enumerable, "accessor", [setter], null, ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.accessor", object.define.configurable, "accessor", [setter], null, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.accessor", object.define.enumerable.configurable, "accessor", [setter], null, ENUMERABLE, CONFIGURABLE)
  })

  describe("value", function () {
    var value = 1

    api("value", object.define, "value", [value], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.value", object.define.writable, "value", [value], WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.value", object.define.enumerable, "value", [value], NOT_WRITABLE, ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.value", object.define.configurable, "value", [value], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.value", object.define.enumerable.configurable, "value", [value], NOT_WRITABLE, ENUMERABLE, CONFIGURABLE)
  })

  describe("method", function () {
    function method () {}

    api("method", object.define, "method", [method], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.method", object.define.writable, "method", [method], WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.method", object.define.enumerable, "method", [method], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.method", object.define.configurable, "method", [method], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.method", object.define.enumerable.configurable, "method", [method], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
  })

  describe("property", function () {
    var property = "hello"

    api("property", object.define, "property", [property], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.property", object.define.writable, "property", [property], WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.property", object.define.enumerable, "property", [property], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.property", object.define.configurable, "property", [property], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.property", object.define.enumerable.configurable, "property", [property], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
  })

  describe("constant", function () {
    var constant = NaN

    api("constant", object.define, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.constant", object.define.writable, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.constant", object.define.enumerable, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.constant", object.define.configurable, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.configurable.constant", object.define.enumerable.configurable, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
  })
})
