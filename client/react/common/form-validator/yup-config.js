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
