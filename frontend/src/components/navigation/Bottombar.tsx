import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { loggedInBottombar, loggedOutBottombar } from "@/utils/navigation";
import { Navigation } from "@/types/interfaces/navigation";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { routesName } from "@/constants/routes";
import { useEffect, useState } from "react";

interface BottombarProps {
  /**
   * Is the user connected
   * @type {boolean}
   */
  isConnected: boolean;
}

function Bottombar({ isConnected }: BottombarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState(location.pathname);
  const [navigation, setNavigation] = useState<Navigation>(loggedOutBottombar);

  // Fetch bottombar navigation element
  useEffect(() => {
    if (isConnected) {
      setNavigation(loggedInBottombar);
    }
  }, []);

  const handleChange = (_event: React.SyntheticEvent, path: string) => {
    setPath(path);
    navigate(path != undefined ? path : routesName.dashboard);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        width: "100%",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={path}
        onChange={handleChange}
        className="stroke-grey fill-none"
      >
        {navigation.crypto.map((navigationLink) => {
          return (
            <BottomNavigationAction
              key={navigationLink.name}
              label={navigationLink.name}
              value={navigationLink.path}
              icon={<navigationLink.iconSvg />}
              sx={{
                "&.Mui-selected": {
                  color: "var(--primary-blue)",
                  stroke: "var(--primary-blue)",
                },
              }}
            />
          );
        })}
        {navigation.user &&
          navigation.user.map((navigationLink) => {
            return (
              <BottomNavigationAction
                key={navigationLink.name}
                label={navigationLink.name}
                value={navigationLink.path}
                icon={<navigationLink.iconSvg />}
                sx={{
                  "&.Mui-selected": {
                    color: "var(--primary-blue)",
                    stroke: "var(--primary-blue)",
                  },
                }}
              />
            );
          })}
      </BottomNavigation>
    </Paper>
  );
}

export default Bottombar;
