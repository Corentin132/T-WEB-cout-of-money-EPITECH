import OAuthGoogle from "@/components/OAuth/google";
import InputText from "@/components/elements/InputText";
import { useEffect, useState } from "react";
import Button from "@/components/elements/Button";
import OAuthGithub from "@/components/OAuth/github";
import { isEmailValid, isPasswordValid } from "@/utils/regex";
import GoldRush from "assets/goldRushLogo.svg";
import { registerApiRequest } from "@/middlewares/auth";
import { AuthRegisterForm } from "@/types/interfaces/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routesName } from "@/constants/routes";
import { useCookies } from "react-cookie";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [, setCookie] = useCookies();
  const token = searchParams.get("token");
  useEffect(() => {
    if (token) {
      setCookie("access_token", token);
      navigate("/");
    }
  }, [token]);

  const handleClick = async () => {
    if (username === "") {
      alert("Please enter your username");
    } else if (isEmailValid(email) === false) {
      alert("Please enter a correct email");
    } else if (isPasswordValid(password) === false) {
      alert("Please enter a valid password");
    } else if (password != passwordConfirm) {
      alert("Please enter same password");
    } else {
      const registerForm: AuthRegisterForm = {
        username,
        email,
        password,
        role: "user",
        passwordConfirm,
      };
      const res = await registerApiRequest(registerForm);
      console.log(res.status);
      if (res.message) {
        alert(res.message);
      } else {
        navigate(routesName.login);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div>
        <div className="flex flex-col items-center justify-center pb-3 px-2">
          <img className="w-1/4 py-8" src={GoldRush} alt="logo gold rush" />
          <h1 className="pb-8 font-sans">Register</h1>

          <p className="px-3 text-center">
            Create your new Gold rush account to master cryptocurrencies like
            never before.
          </p>
          <div className="flex ">
            <p className="px-2">Already have an account ?</p>
            <a className="text-bluePrimary" href="/login">
              Login ?
            </a>
          </div>
        </div>
      </div>
      <OAuthGoogle></OAuthGoogle>
      <OAuthGithub></OAuthGithub>
      <div className="flex w-1/4 h-full items-center justify-center mobile:w-3/4">
        <span className="w-3/4 bg-darkBluePrimary h-0.5 tablet:w-full"></span>
        <span className="p-3 text-xl">Or</span>
        <span className="w-3/4 bg-darkBluePrimary h-0.5  tablet:w-full"></span>
      </div>
      <div className="flex items-center justify-center flex-col w-full">
        <div className="p-3 w-1/5 laptop:w-1/3 mobile:w-3/4">
          <InputText
            label="Username"
            type="text"
            value={username}
            isRequired={true}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></InputText>
        </div>
        <div className="p-3 w-1/5 laptop:w-1/3 mobile:w-3/4">
          <InputText
            label="Email"
            type="text"
            value={email}
            isRequired={true}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></InputText>
        </div>
        <div className="p-3 w-1/5 laptop:w-1/3 mobile:w-3/4">
          <InputText
            label="Password"
            type="password"
            value={password}
            isRequired={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputText>
        </div>
        <div className="p-3 w-1/5 laptop:w-1/3 mobile:w-3/4">
          <InputText
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            isRequired={true}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></InputText>
        </div>
        <div className="p-3 w-1/5 flex items-center justify-center laptop:w-1/3 mobile:w-3/4d">
          <Button
            name="Register"
            type="submit"
            color="text-white bg-bluePrimary"
            onClick={handleClick}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
