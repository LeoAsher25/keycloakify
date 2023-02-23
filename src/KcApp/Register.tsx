// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
// It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
// provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.
// Note that it is no longer recommended to use register.ftl, it's best to use register-user-profile.ftl
// See: https://docs.keycloakify.dev/realtime-input-validation

import { yupResolver } from "@hookform/resolvers/yup";
import type { KcProps } from "keycloakify";
import Template from "keycloakify/lib/components/Template";
import { clsx } from "keycloakify/lib/tools/clsx";
import { memo } from "react";
import { useForm } from "react-hook-form";
import type { I18n } from "./i18n";
import type { KcContext } from "./kcContext";
import { registorSchema } from "./yup";

type KcContext_Register = Extract<KcContext, { pageId: "register.ftl" }>;

const Register = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_Register; i18n: I18n } & KcProps) => {
    const { url, messagesPerField, register, passwordRequired } = kcContext;
    const { msg } = i18n;

    const form = useForm({
      mode: "onChange",
      resolver: yupResolver(registorSchema),
    });

    const handleSubmit = (event: any) => {
      form.trigger();
      if (!form.formState.isValid) {
        event?.preventDefault();
      }
    };

    return (
      <Template
        {...{ kcContext, i18n, ...props }}
        doFetchDefaultThemeResources={true}
        headerNode="Chào mừng bạn đến với S2B"
        formNode={
          <form
            id="kc-register-form"
            className={clsx(props.kcFormClass)}
            action={url.registrationAction}
            onSubmit={handleSubmit}
            method="post">
            <div className="name-wrap">
              <div
                className={clsx(
                  "require-field",
                  props.kcFormGroupClass,
                  messagesPerField.printIfExists(
                    "lastName",
                    props.kcFormGroupErrorClass
                  )
                )}>
                <div className={clsx(props.kcLabelWrapperClass)}>
                  <label
                    htmlFor="lastName"
                    className={clsx(props.kcLabelClass)}>
                    Họ
                  </label>
                </div>
                <div className={clsx(props.kcInputWrapperClass)}>
                  <input
                    type="text"
                    id="lastName"
                    className={clsx(props.kcInputClass)}
                    defaultValue={register.formData.lastName ?? ""}
                    placeholder="Nhập họ"
                    {...form.register("lastName")}
                  />

                  {form.formState.errors.lastName && (
                    <div className="error-message">
                      {form.formState.errors.lastName?.message as string}
                    </div>
                  )}
                </div>
              </div>

              <div
                className={clsx(
                  "require-field",
                  props.kcFormGroupClass,
                  messagesPerField.printIfExists(
                    "firstName",
                    props.kcFormGroupErrorClass
                  )
                )}>
                <div className={clsx(props.kcLabelWrapperClass)}>
                  <label
                    htmlFor="firstName"
                    className={clsx(props.kcLabelClass)}>
                    Tên
                  </label>
                </div>
                <div className={clsx(props.kcInputWrapperClass)}>
                  <input
                    type="text"
                    id="firstName"
                    className={clsx(props.kcInputClass)}
                    defaultValue={register.formData.firstName ?? ""}
                    placeholder="Nhập tên"
                    {...form.register("firstName")}
                  />
                  {form.formState.errors.firstName && (
                    <div className="error-message">
                      {form.formState.errors.firstName?.message as string}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={clsx(
                "require-field",
                props.kcFormGroupClass,
                messagesPerField.printIfExists(
                  "email",
                  props.kcFormGroupErrorClass
                )
              )}>
              <div className={clsx(props.kcLabelWrapperClass)}>
                <label htmlFor="email" className={clsx(props.kcLabelClass)}>
                  {msg("email")}
                </label>
              </div>
              <div className={clsx(props.kcInputWrapperClass)}>
                <input
                  type="text"
                  id="email"
                  className={clsx(props.kcInputClass)}
                  defaultValue={register.formData.email ?? ""}
                  autoComplete="email"
                  placeholder="Nhập email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <div className="error-message">
                    {form.formState.errors.email?.message as string}
                  </div>
                )}
              </div>
            </div>
            {/* {!realm.registrationEmailAsUsername && (
              <div
                className={clsx(
                   "require-field",props.kcFormGroupClass,
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
                    defaultValue={register.formData.username ?? ""}
                    autoComplete="username"
                    placeholder="Nhập email"
                  />
                </div>
              </div>
            )} */}
            {passwordRequired && (
              <>
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

                <div
                  className={clsx(
                    "require-field",
                    props.kcFormGroupClass,
                    messagesPerField.printIfExists(
                      "password-confirm",
                      props.kcFormGroupErrorClass
                    )
                  )}>
                  <div className={clsx(props.kcLabelWrapperClass)}>
                    <label
                      htmlFor="password-confirm"
                      className={clsx(props.kcLabelClass)}>
                      Xác nhận lại mật khẩu
                    </label>
                  </div>
                  <div className={clsx(props.kcInputWrapperClass)}>
                    <input
                      type="password"
                      id="password-confirm"
                      className={clsx(props.kcInputClass)}
                      placeholder="Nhập lại mật khẩu"
                      {...form.register("passwordConfirm")}
                    />
                    {form.formState.errors.passwordConfirm && (
                      <div className="error-message">
                        {
                          form.formState.errors.passwordConfirm
                            ?.message as string
                        }
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className={clsx(props.kcFormGroupClass)}>
              <div
                id="kc-form-buttons register-btn-wrap"
                style={{ marginTop: "1.2rem" }}
                className={clsx(props.kcFormButtonsClass)}>
                <input
                  className={clsx(
                    props.kcButtonClass,
                    props.kcButtonPrimaryClass,
                    props.kcButtonBlockClass,
                    props.kcButtonLargeClass
                  )}
                  type="submit"
                  value="Đăng ký"
                />
              </div>

              <div
                id="kc-form-options"
                className={clsx(props.kcFormOptionsClass)}>
                <div className={clsx(props.kcFormOptionsWrapperClass)}>
                  <span className="navigate-link">
                    <span>Bạn đã có tài khoản?</span>
                    <a href={url.loginUrl}>Đăng nhập</a>
                  </span>
                </div>
              </div>
            </div>
          </form>
        }
      />
    );
  }
);

export default Register;
