import { AuthLoginForm, AuthRegisterForm } from "@/types/interfaces/auth";

/**
 * This async function sends an api request with the login credentials
 * @param loginForm is the AuthLoginForm interface
 */
export const loginApiRequest = async (loginForm: AuthLoginForm) => {
  // TODO: Verify routes path
  const response = await fetch("http://localhost:4000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginForm),
  });

  if (!response.ok) {
    throw new Error("Login error"); // TODO: Specify the error handling depending on the api error status returned
  }
};
export const registerApiRequest = async (registerForm: AuthRegisterForm) => {
  const response = await fetch("http://localhost:4000/user/register", {
    method: "post",
    // credentials: "include",
    // mode: "no-cors",
    // url: `http://localhost:4000`,
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(registerForm),
  });

  // if (!response.ok) {
  //   throw new Error("Register error : " + response.json()); // TODO: Specify the error handling depending on the api error status returned
  // }

  return response.json();
};
export const googleLoginRequest = async () => {
  // TODO: Handle google login requests.
};
export const isLogin = async () => {};
