import { object, string, ref } from "yup";

export const registorSchema = object().shape({
  lastName: string()
    .required("Họ không được để trống")
    .max(100, "Tối đa 100 ký tự"),
  firstName: string()
    .required("Tên không được để trống")
    .max(100, "Tối đa 100 ký tự"),
  email: string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
  password: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Tối thiểu 6 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt"
    ),
  "password-confirm": string().oneOf(
    [ref("password"), null as any],
    "Passwords must match"
  ),
});

export const loginSchema = object().shape({
  username: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  password: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Tối thiểu 6 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt"
    ),
});

export const resetSchema = object().shape({
  username: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
});
