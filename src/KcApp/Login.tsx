// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
// It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
// provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.
// Note that it is no longer recommended to use login.ftl, it's best to use register-user-profile.ftl
// See: https://docs.keycloakify.dev/realtime-input-validation

import { yupResolver } from "@hookform/resolvers/yup";
import type { KcProps } from "keycloakify";
import Template from "keycloakify/lib/components/Template";
import { clsx } from "keycloakify/lib/tools/clsx";
import { memo } from "react";
import { useForm } from "react-hook-form";
import type { I18n } from "./i18n";
import type { KcContext } from "./kcContext";
import { loginSchema } from "./yup";

type KcContext_Login = Extract<KcContext, { pageId: "login.ftl" }>;

const Login = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_Login; i18n: I18n } & KcProps) => {
    const { url, messagesPerField, login, auth, message } = kcContext;

    const form = useForm({
      mode: "onSubmit",
      resolver: yupResolver(loginSchema),
    });

    const handleSubmit = (event: any) => {
      form.trigger();
      console.log("value: ", form.getValues(), form.formState.isValid);
      if (!form.formState.isValid) {
        event?.preventDefault();
      }
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
            {auth.attemptedUsername && (
              <h1 id="kc-page-title">Đăng nhập hệ thống S2B</h1>
            )}
            <div className="form-wrap">
              {/* {!realm.registrationEmailAsUsername && ( */}
              <div
                className={clsx(
                  "require-field",
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
                    defaultValue={login.username ?? ""}
                    autoComplete="username"
                    placeholder="Nhập email"
                    {...form.register("username")}
                  />
                  {form.formState.errors.username && (
                    <div className="error-message">
                      {form.formState.errors.username?.message as string}
                    </div>
                  )}
                  {message?.summary && message.type === "error" && (
                    <div className="error-message">
                      {message?.summary as string}
                    </div>
                  )}
                </div>
              </div>
              {/* )} */}
              <div
                className={clsx(
                  "require-field",
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
                    autoComplete="new-password"
                    placeholder="Nhập mật khẩu"
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <div className="error-message">
                      {form.formState.errors.password?.message as string}
                    </div>
                  )}
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
