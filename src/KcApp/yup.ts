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
  password: string().required("Mật khẩu không được để trống"),
  passwordConfirm: string().oneOf(
    [ref("password"), null as any],
    "Passwords must match"
  ),
});

export const loginSchema = object().shape({
  username: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  password: string().required("Mật khẩu không được để trống"),
});

export const resetSchema = object().shape({
  username: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
});
