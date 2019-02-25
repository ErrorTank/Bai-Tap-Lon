import * as yup from "yup";


const accountSchema = yup.object().shape({
    username: yup.string().min(6, "Tên đăng nhập lớn hơn 6 kí tự").max(20, "Tên đăng nhập nhỏ hơn 20 kí tự").onlyWord("Tên đăng nhập không được có kí tự đặc biệt").haveChar("Tên đăng nhập phải có kí tự alphabet").haveNumber("Tên đăng nhập phải có chữ số"),
    password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt"),
    role: yup.number().required(),
    canLogin: yup.number().required()
});

const prizeSchema = yup.object().shape({
    name: yup.string().max(50, "Tên giải thưởng tối đa 50 kí tự").required("Tên giải thưởng không được để trống"),
    content: yup.string(),
    dir: yup.array()
});

const rcSchema = yup.object().shape({
    sID: yup.string().required("Trường không được để trống"),
    contestID: yup.string().required("Kì thi không được để trống"),
    name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
    address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự").required("Thí sinh không được để trống"),
    phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
    email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
    CMT: yup.string().max(20, "CMT không được vượt quá 20 ký tự").onlyWord("CMT không được có ký tự đặc biệt").required("CMT không được để trống"),
    gender: yup.boolean().required(),
    dob: yup.date().required("Ngày sinh không được để trống"),
    username: yup.string().max(20, "Tên đăng nhập nhỏ hơn 20 kí tự").onlyWord("Tên đăng nhập không được có kí tự đặc biệt").haveChar("Tên đăng nhập phải có kí tự alphabet").haveNumber("Tên đăng nhập phải có chữ số"),
    password: yup.string().onlyWord("Mật khẩu không được có kí tự đặc biệt"),
});

const rcApproveSchema = yup.object().shape({
    rcID: yup.string().required(),
    sID: yup.string().required("Trường không được để trống"),
    name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
    address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự").required("Thí sinh không được để trống"),
    phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
    email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
    CMT: yup.string().max(20, "CMT không được vượt quá 20 ký tự").onlyWord("CMT không được có ký tự đặc biệt").required("CMT không được để trống"),
    gender: yup.boolean().required(),
    dob: yup.date().required("Ngày sinh không được để trống"),
    username: yup.string().min(6, "Tên đăng nhập lớn hơn 6 kí tự").max(20, "Tên đăng nhập nhỏ hơn 20 kí tự").onlyWord("Tên đăng nhập không được có kí tự đặc biệt").haveChar("Tên đăng nhập phải có kí tự alphabet").haveNumber("Tên đăng nhập phải có chữ số"),
    password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt"),
});

const supervisorSchema = yup.object().shape({
    name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
    address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự"),
    phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
    email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),

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
//TODO add date validate to all date input
const candidateSchema = yup.object().shape({
    sID: yup.string().required("Trường không được để trống"),
    name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
    address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự").required("Thí sinh không được để trống"),
    phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
    email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
    CMT: yup.string().max(20, "CMT không được vượt quá 20 ký tự").onlyWord("CMT không được có ký tự đặc biệt").required("CMT không được để trống"),
    gender: yup.boolean().required(),
    dob: yup.date().required("Ngày sinh không được để trống")
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

const orgLocationSchema = yup.object().shape({
    name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
    phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
    address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự").required("Địa chỉ không được để trống"),
    rooms: yup.array()

});

const roomSchema = yup.object().shape({
    name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
    locate: yup.string().max(200, "Vị trí không được vượt quá 200 ký tự").required("Vị trí không được để trống"),
    maxSeat: yup.number().integer("Sức chứa phải là số nguyên").max(200, "Sức chứa phải nhỏ hơn 200").required("Sức chứa không được để trống")
});

const subjectSchema = yup.object().shape({
    name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
    content: yup.string().max(200, "Mô tả không được vượt quá 50 ký tự"),
});


const examDateSchema = yup.object().shape({
    start: yup.date().required("Thời gian bắt đầu không được để trống"),
    stop: yup.date().required("Thời gian kết thúc không được để trống"),
    content: yup.string().max(200, "Mô tả không được vượt quá 200 ký tự"),
    roomID: yup.string().required("Địa điểm thi không được để trống"),

});

const examDateCandidateSchema = yup.object().shape({
    cID: yup.string().required("SBD không được để trống"),
    SBD: yup.string().max(10).required("SBD không được để trống"),
    examDate: examDateSchema.required("Buổi thi là bắt buộc")
});

const examDateSupervisorSchema = yup.object().shape({
    supervisorID: yup.string().required("SBD không được để trống"),
    examDate: examDateSchema.required("Buổi thi là bắt buộc")
});

const contestSchema = yup.object().shape({
    contestName: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
    content: yup.string().max(200, "Mô tả không được vượt quá 200 ký tự"),
    subjectID: yup.string().required("Môn thi là bắt buộc"),
    fee: yup.number().required("Phí dự thi không được để trống"),
    orgLocationID: yup.string().required(),
    canSeeResult: yup.boolean().required(),
    examDates: yup.array().of(examDateSchema).min(0).required(),
    supervisors: yup.array().min(0),
    candidates: yup.array().min(0),

});

export
{
    accountSchema,
    prizeSchema,
    userSchema,
    candidateSchema,
    schoolPresenterSchema,
    schoolSchema,
    supervisorSchema,
    orgLocationSchema,
    roomSchema,
    subjectSchema,
    contestSchema,
    examDateSchema,
    examDateCandidateSchema,
    rcSchema,
    examDateSupervisorSchema,
    rcApproveSchema
}