/// <reference types="vite-plugin-svgr/client" />

import { AuthLoginForm } from "@/types/interfaces/auth";
import InputText from "components/elements/InputText";
import React, { useState } from "react";
import Button from "components/elements/Button";
import Divider from "@mui/material/Divider";

import OAuthGoogle from "../OAuth/google";
import OAuthGithub from "../OAuth/github";

interface LoginFormProps {
  /**
   * Is the function submitting the form
   * @param form is the AuthLoginForm interface
   * @returns void
   */
  submitForm: (form: AuthLoginForm) => void;

  /**
   * Is the function that redirects login to google
   * @returns void
   */
}

function LoginForm({ submitForm }: LoginFormProps) {
  const [form, setForm] = useState<AuthLoginForm>({
    email: "",
    password: "",
  });

  // This function updates the form attributes with the user inputs.
  const handleChange =
    (inputName: keyof AuthLoginForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [inputName]: event.target.value,
      });
    };

  return (
    <div className="grid grid-cols-1 gap-10 justify-items-center content-center w-full h-full p-4">
      <h1 className="text-center">LOGIN</h1>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submitForm(form);
        }}
        className="flex flex-col items-center w-full h-full gap-5"
      >
        <InputText
          label="email"
          type="email"
          isRequired={true}
          value={form.email}
          onChange={handleChange("email")}
          className="w-3/4 mobile:w-full"
        />
        <InputText
          label="password"
          type="password"
          isRequired={true}
          value={form.password}
          onChange={handleChange("password")}
          className="w-3/4 mobile:w-full"
        />
        <Button
          name="Login"
          type="submit"
          color="bg-bluePrimary"
          className="mobile:w-full w-1/2 mt-5"
        />
        <div className="w-full flex flex-col items-center">
          <Divider flexItem>Or</Divider>
          {/* <Button
            name="Login with Google"
            type="button"
            color="bg-grey"
            className="mobile:w-full w-1/2 mt-5"
            onClick={redirectLoginGoogle}
            IconSvg={GoogleIcon}
          /> */}
          <OAuthGoogle></OAuthGoogle>
          <OAuthGithub></OAuthGithub>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
