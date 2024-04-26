import AuthBanner from "@/components/auth/AuthBanner";
import LoginForm from "@/components/auth/LoginForm";
import { loginApiRequest } from "@/middlewares/auth";
import { AuthLoginForm } from "@/types/interfaces/auth";
import { useNavigate } from "react-router-dom";
import { routesName } from "@/constants/routes";
import { useState } from "react";
import Alert from "@mui/material/Alert";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  const setAlertUi = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
  };

  const handleLogin = async (loginForm: AuthLoginForm) => {
    try {
      await loginApiRequest(loginForm);
      // Navigate to dashboard in case of success
      navigate(routesName.dashboard);
    } catch (error) {
      // Display error message in case of api error
      setAlertUi();
    }
  };

  return (
    <div>
      {error ? <Alert severity="error">Incorrect credentials</Alert> : null}
      <div className="grid grid-cols-6 mobile:grid-cols-4 w-full h-screen bg-white">
        <div className="col-span-2 mobile:hidden">
          <AuthBanner />
        </div>
        <div className="col-span-4 self-center justify-self-center w-full h-full">
          <LoginForm submitForm={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default Login;
