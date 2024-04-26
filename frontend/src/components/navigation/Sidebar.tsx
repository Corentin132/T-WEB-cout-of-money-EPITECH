import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GoldRushLogo from "assets/goldRushLogo.svg";
import { useLocation } from "react-router-dom";
import { Navigation } from "@/types/interfaces/navigation";
import NavigationLink from "@/components/navigation/NavigationLink";
import {
  adminSidebar,
  loggedInSidebar,
  loggedOutSidebar,
} from "@/utils/navigation";
import Button from "components/elements/Button";
import { routesName } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface SidebarProps {
  /**
   * Is the user connected
   * @type {boolean}
   */
  isConnected: boolean;

  /**
   * Is the user Admin
   * @type {boolean}
   */
  isAdmin: boolean;
}

function Sidebar({ isConnected, isAdmin }: SidebarProps) {
  // Get the page url
  const location = useLocation();
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState<Navigation>(loggedOutSidebar);

  /**
   * Is the sidebar elements to display
   */
  useEffect(() => {
    if (isConnected && isAdmin) {
      setNavigation(adminSidebar);
    } else if (isConnected) {
      setNavigation(loggedInSidebar);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          width: "100%",
          flexShrink: 0,
          boxSizing: "border-box",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div className="grid grid-rows-9 h-full">
          <div
            id="sidebar-header"
            className="w-full row-start-1 row-end-2 grid grid-cols-6 content-center"
          >
            <div className="col-span-2 justify-self-center">
              <img
                src={GoldRushLogo}
                alt="Gold Rush Logo"
                className="w-12 h-12 tablet:w-8 tablet:h-8"
              />
            </div>
            <Typography
              className="col-span-4 justify-self-start self-center"
              sx={{ fontWeight: "bold" }}
            >
              Gold Rush
            </Typography>
          </div>
          <div
            id="navigation-menu-crypto"
            className="row-span-2 row-start-3 mr-3 laptop:mr-0"
          >
            {navigation.crypto.map((navigationLink) => {
              const isActive = location.pathname === navigationLink.path;
              return (
                <NavigationLink
                  key={navigationLink.name}
                  navigationLink={navigationLink}
                  isActive={isActive}
                />
              );
            })}
          </div>
          <div
            id="navigation-menu-user"
            className="row-span-4 row-start-5 mr-3 laptop:mr-0"
          >
            {navigation.user ? (
              navigation.user.map((navigationLink) => {
                const isActive = location.pathname === navigationLink.path;
                return (
                  <NavigationLink
                    key={navigationLink.name}
                    navigationLink={navigationLink}
                    isActive={isActive}
                  />
                );
              })
            ) : (
              <div>
                <p className="text-center mb-5">
                  Don't wait another second and join us to master cryptos like
                  never before.
                </p>
                <div className="w-full mb-3 text-center">
                  <Button
                    name="Register"
                    color="bg-bluePrimary"
                    type="button"
                    onClick={() => {
                      navigate(routesName.register);
                    }}
                    className="mobile:w-full w-3/4 mx-auto"
                  />
                </div>
                <div className="w-full mb-3 text-center">
                  <Button
                    name="Login"
                    color="bg-bluePrimary"
                    type="button"
                    onClick={() => {
                      navigate(routesName.login);
                    }}
                    className="mobile:w-full w-3/4 mx-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </>
  );
}

export default Sidebar;
