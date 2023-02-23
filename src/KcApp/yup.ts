import { object, string } from "yup";

export const registorSchema = object().shape({
  lastName: string().required("Họ không được để trống"),
  firstName: string().required("Tên không được để trống"),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  password: string().required("Mật khẩu không được để trống"),
  passwordConfirm: string().required("Mật khẩu không trùng khớp"),
});

export const loginSchema = object().shape({
  username: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  password: string().required("Mật khẩu không được để trống"),
});
