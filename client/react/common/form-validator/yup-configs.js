import * as yup from "yup";
import isEmpty from "lodash/isEmpty";

yup.addMethod(yup.string, "isTax", function (message) {
  return this.test("isTax", message, function (val) {
    return val ? (val.length === 14 || val.length === 10) : true
  })
});

yup.addMethod(yup.object, "notEmpty", function (message = "no data") {
  return this.test("notEmpty", message, function (val) {
    return !isEmpty(val)
  })
});
yup.addMethod(yup.string, "onlyWord", function (message) {
  return this.test("onlyWord", message, function (val) {
    return /\W/gi.test(val) === false
  })
});

yup.addMethod(yup.string, "haveChar", function (message) {
  return this.test("haveChar", message, function (val) {
    return /[a-z]/gi.test(val) === true
  })
});

yup.addMethod(yup.string, "haveNumber", function (message) {
  return this.test("haveNumber", message, function (val) {
    return /\d/gi.test(val) === true
  })
});
