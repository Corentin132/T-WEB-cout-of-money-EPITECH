import theme from "@/theme";
import { useMediaQuery } from "@mui/material";
import Sidebar from "@/components/navigation/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Bottombar from "components/navigation/Bottombar";
import { useAuth } from "./userContext";
import Topbar from "@/components/navigation/Topbar";

function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));

  const auth = useAuth();
  const navigate = useNavigate();
  if (window.location.pathname === "/") {
    navigate("/dashboard");
  }

  return (
    <div className="w-full h-screen grid mobile:grid-cols-4 grid-cols-5">
      {/* This is the sidebar and bottom nav */}
      {isMobile ? (
        <Bottombar isConnected={auth.user.email != "" ? true : false} />
      ) : (
        <div id="sidebar" className="w-full h-full col-span-1">
          <Sidebar
            isConnected={auth.user.email != "" ? true : false}
            isAdmin={auth.user.role != "user" && auth.user.role != ""}
          />
        </div>
      )}

      {/* This is where all the children will be placed */}
      <div className="h-full w-full p-3 col-span-4 bg-bgGrey mobile:bg-white mb-2 mobile:mb-10">
        <Topbar isConnected={auth.user.email != "" ? true : false} />

        <Outlet />
      </div>
    </div>
  );
}

export default App;
