import { InferType, object, string } from "yup";

const registorSchema = object().shape({
  password: string().required("Mật khẩu không được để trống"),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  username: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  firstName: string().required("Tên không được để trống"),
  lastName: string().required("Họ không được để trống"),
});

export default registorSchema;

export interface RegistorInterface extends InferType<typeof registorSchema> {}
