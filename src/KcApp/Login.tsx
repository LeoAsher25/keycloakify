// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
// It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
// provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.
// Note that it is no longer recommended to use login.ftl, it's best to use register-user-profile.ftl
// See: https://docs.keycloakify.dev/realtime-input-validation

import { FormEvent, memo, useState } from "react";
import Template from "keycloakify/lib/components/Template";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";
import { loginSchema } from "./yup";

type KcContext_Login = Extract<KcContext, { pageId: "login.ftl" }>;

const Login = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_Login; i18n: I18n } & KcProps) => {
    const { url, messagesPerField, login, realm } = kcContext;
    const [errors, setErrors] = useState([]);

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      const formData = event.target as any;

      console.log("formData: , ", formData);

      loginSchema
        .validate(
          {
            username: formData.username.value,
            password: formData.password.value,
          },
          { abortEarly: false }
        )
        .then((value) => {
          console.log("value:", value);
        })
        .catch((error) => {
          console.log("error: ", error.errors);
          setErrors(error.errors);
        });
    };

    return (
      <Template
        {...{ kcContext, i18n, ...props }}
        doFetchDefaultThemeResources={true}
        headerNode="Đăng nhập hệ thống S2B"
        formNode={
          <form
            id="kc-login-form"
            className={clsx(props.kcFormClass)}
            action={url.loginAction}
            onSubmit={handleSubmit}
            method="post">
            {errors.length > 0 && (
              <ul className="alert alert-error">
                {errors.map((error, index) => (
                  <li key={index} className="kc-feedback-text">
                    {error}
                  </li>
                ))}
              </ul>
            )}
            <div className="form-wrap">
              {!realm.registrationEmailAsUsername && (
                <div
                  className={clsx(
                    props.kcFormGroupClass,
                    messagesPerField.printIfExists(
                      "username",
                      props.kcFormGroupErrorClass
                    )
                  )}>
                  <div className={clsx(props.kcLabelWrapperClass)}>
                    <label
                      htmlFor="username"
                      className={clsx(props.kcLabelClass)}>
                      Email
                    </label>
                  </div>
                  <div className={clsx(props.kcInputWrapperClass)}>
                    <input
                      type="text"
                      id="username"
                      className={clsx(props.kcInputClass)}
                      name="username"
                      defaultValue={login.username ?? ""}
                      autoComplete="username"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
              )}
              <div
                className={clsx(
                  props.kcFormGroupClass,
                  messagesPerField.printIfExists(
                    "password",
                    props.kcFormGroupErrorClass
                  )
                )}>
                <div className={clsx(props.kcLabelWrapperClass)}>
                  <label
                    htmlFor="password"
                    className={clsx(props.kcLabelClass)}>
                    Mật khẩu
                  </label>
                </div>
                <div className={clsx(props.kcInputWrapperClass)}>
                  <input
                    type="password"
                    id="password"
                    className={clsx(props.kcInputClass)}
                    name="password"
                    autoComplete="new-password"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              </div>

              <div className={clsx(props.kcFormGroupClass)}>
                <div
                  id="kc-form-buttons"
                  className={clsx(props.kcFormButtonsClass)}>
                  <input
                    className={clsx(
                      props.kcButtonClass,
                      props.kcButtonPrimaryClass,
                      props.kcButtonBlockClass,
                      props.kcButtonLargeClass
                    )}
                    type="submit"
                    value="Đăng nhập"
                  />
                </div>

                <div
                  id="kc-form-options"
                  className={clsx(props.kcFormOptionsClass)}>
                  <div className={clsx(props.kcFormOptionsWrapperClass)}>
                    <span className="navigate-link">
                      <a href={url.loginResetCredentialsUrl}>Quên mật khẩu</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="kc-form-options"
              className={clsx(props.kcFormOptionsClass)}>
              <div className="divide-line"></div>
            </div>

            <div
              id="kc-form-options"
              className={clsx(props.kcFormOptionsClass)}>
              <div className={clsx(props.kcFormOptionsWrapperClass)}>
                <span className="navigate-btn">
                  <a href={url.registrationUrl}>Tạo tài khoản mới</a>
                </span>
              </div>
            </div>
          </form>
        }
      />
    );
  }
);

export default Login;
