import * as yup from "yup";

const accountSchema = yup.object().shape({
  username: yup.string().min(6, "Tên đăng nhập lớn hơn 6 kí tự").max(20, "Tên đăng nhập nhỏ hơn 20 kí tự").onlyWord("Tên đăng nhập không được có kí tự đặc biệt").haveChar("Tên đăng nhập phải có kí tự alphabet").haveNumber("Tên đăng nhập phải có chữ số"),
  password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt"),
  role: yup.number().required(),
  canLogin: yup.number().required()
});

const userSchema = yup.object().shape({
  name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
  address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự"),
  phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  CMT: yup.string().max(20, "CMT không được vượt quá 20 ký tự").onlyWord("CMT không được có ký tự đặc biệt").required("CMT không được để trống"),
  gender: yup.boolean().required(),
  employeeID: yup.string().max(10, "Mã nhân viên không được vượt quá 10 ký tự").required("Mã nhân viên không được để trống")
});

const candidateSchema = yup.object().shape({
  sID: yup.string().required("Trường không được để trống"),
  name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
  address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự").required("Thí sinh không được để trống"),
  phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  CMT: yup.string().max(20, "CMT không được vượt quá 20 ký tự").onlyWord("CMT không được có ký tự đặc biệt").required("CMT không được để trống"),
  gender: yup.boolean().required(),
  dob: yup.string().required("Ngày sinh không được để trống")
});

const schoolPresenterSchema = yup.object().shape({
  sID: yup.string().required("Trường không được để trống"),
  name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
  phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
  address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
});

const schoolSchema = yup.object().shape({
  name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
  phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
  address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự").required(),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),

});

export {
  accountSchema,
  userSchema,
  candidateSchema,
  schoolPresenterSchema,
  schoolSchema
}