var chai = require("chai")
var assert = chai.assert
var util = require("../index")

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
    descriptor("default", util.object, NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("writable", util.object.writable, WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("enumerable", util.object.enumerable, NOT_WRITABLE, ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("configurable", util.object.configurable, NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    descriptor("writable.enumerable", util.object.writable.enumerable, WRITABLE, ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("enumerable.writable", util.object.enumerable.writable, WRITABLE, ENUMERABLE, NOT_CONFIGURABLE)
    descriptor("writable.configurable", util.object.writable.configurable, WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    descriptor("configurable.writable", util.object.configurable.writable, WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    descriptor("enumerable.configurable", util.object.enumerable.configurable, NOT_WRITABLE, ENUMERABLE, CONFIGURABLE)
    descriptor("configurable.enumerable", util.object.configurable.enumerable, NOT_WRITABLE, ENUMERABLE, CONFIGURABLE)
  })

  describe("accessor", function () {
    function getter () {}
    function setter () {}

    api("accessor", util.object, "accessor", [getter, setter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.accessor", util.object.writable, "accessor", [getter, setter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.accessor", util.object.enumerable, "accessor", [getter, setter], null, ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.accessor", util.object.configurable, "accessor", [getter, setter], null, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.accessor", util.object.enumerable.configurable, "accessor", [getter, setter], null, ENUMERABLE, CONFIGURABLE)
  })
  describe("getter", function () {
    function getter () {}

    api("accessor", util.object, "accessor", [getter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.accessor", util.object.writable, "accessor", [getter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.accessor", util.object.enumerable, "accessor", [getter], null, ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.accessor", util.object.configurable, "accessor", [getter], null, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.accessor", util.object.enumerable.configurable, "accessor", [getter], null, ENUMERABLE, CONFIGURABLE)
  })

  describe("setter", function () {
    function setter () {}

    api("accessor", util.object, "accessor", [setter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.accessor", util.object.writable, "accessor", [setter], null, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.accessor", util.object.enumerable, "accessor", [setter], null, ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.accessor", util.object.configurable, "accessor", [setter], null, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.accessor", util.object.enumerable.configurable, "accessor", [setter], null, ENUMERABLE, CONFIGURABLE)
  })

  describe("value", function () {
    var value = 1

    api("value", util.object, "value", [value], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.value", util.object.writable, "value", [value], WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.value", util.object.enumerable, "value", [value], NOT_WRITABLE, ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.value", util.object.configurable, "value", [value], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.value", util.object.enumerable.configurable, "value", [value], NOT_WRITABLE, ENUMERABLE, CONFIGURABLE)
  })

  describe("method", function () {
    function method () {}

    api("method", util.object, "method", [method], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.method", util.object.writable, "method", [method], WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.method", util.object.enumerable, "method", [method], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.method", util.object.configurable, "method", [method], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.method", util.object.enumerable.configurable, "method", [method], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
  })

  describe("property", function () {
    var property = "hello"

    api("property", util.object, "property", [property], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.property", util.object.writable, "property", [property], WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.property", util.object.enumerable, "property", [property], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.property", util.object.configurable, "property", [property], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
    api("enumerable.configurable.property", util.object.enumerable.configurable, "property", [property], NOT_WRITABLE, NOT_ENUMERABLE, CONFIGURABLE)
  })

  describe("constant", function () {
    var constant = NaN

    api("constant", util.object, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("writable.constant", util.object.writable, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.constant", util.object.enumerable, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("configurable.constant", util.object.configurable, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
    api("enumerable.configurable.constant", util.object.enumerable.configurable, "constant", [constant], NOT_WRITABLE, NOT_ENUMERABLE, NOT_CONFIGURABLE)
  })
})
