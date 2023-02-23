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
import { resetSchema } from "./yup";

type KcContext_ResetPassword = Extract<
  KcContext,
  { pageId: "login-reset-password.ftl" }
>;

const ResetPassword = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_ResetPassword; i18n: I18n } & KcProps) => {
    const { url, messagesPerField, realm } = kcContext;
    console.log("kcContext: ", kcContext);

    const form = useForm({
      mode: "onChange",
      resolver: yupResolver(resetSchema),
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
        headerNode=""
        formNode={
          <form
            id="kc-login-form"
            className={clsx("form-reset-wrap", props.kcFormClass)}
            action={url.loginAction}
            onSubmit={handleSubmit}
            method="post">
            <div className="form-wrap ">
              <h1 id="kc-page-title">Quên mật khẩu</h1>
              <div className="divide-line"></div>
              <div className="reset-password-description">
                Bạn quên mật khẩu của mình? Đừng lo lắng! Hãy cung cấp cho chúng
                tôi email bạn sử dụng để đăng ký tài khoản. Chúng tôi sẽ gửi cho
                bạn một liên kết để đặt lại mật khẩu của bạn qua email đó.
              </div>

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
                    // defaultValue={login.username ?? ""}
                    autoComplete="username"
                    placeholder="Nhập email"
                    {...form.register("username")}
                  />
                  {form.formState.errors.username && (
                    <div className="error-message">
                      {form.formState.errors.username?.message as string}
                    </div>
                  )}
                </div>
              </div>

              {/* <div
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
              </div> */}
              <div
                id="kc-form-options"
                className={clsx(props.kcFormOptionsClass)}>
                <div className="divide-line"></div>
              </div>

              <div className={clsx(props.kcFormGroupClass)}>
                <div
                  id="kc-form-buttons"
                  className={clsx(props.kcFormButtonsClass)}>
                  <div className="btn-wrap">
                    <div className="cancel-reset-btn">
                      <a href={url.loginUrl}>Hủy bỏ</a>
                    </div>
                    <input
                      className={clsx(
                        props.kcButtonClass,
                        props.kcButtonPrimaryClass
                      )}
                      type="submit"
                      value="Đăng nhập"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        }
      />
    );
  }
);

export default ResetPassword;
