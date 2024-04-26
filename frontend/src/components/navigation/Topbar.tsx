import GoldRushLogoDetoured from "assets/goldRushLogoDetoured.svg?react";
import UserIcon from "assets/userIcon.svg?react";
import { useNavigate } from "react-router-dom";
import { routesName } from "@/constants/routes";

interface TopbarProps {
  /**
   * Is the user connected
   * @type {boolean}
   */
  isConnected: boolean;
}

function Topbar({ isConnected }: TopbarProps) {
  const navigate = useNavigate();

  const handleProfileNavigation = () => {
    navigate(routesName.profile);
  };

  return (
    <div className="w-full h-16 p-2 flex flex-row mobile:justify-between justify-end">
      <GoldRushLogoDetoured />
      <UserIcon
        className={`${
          isConnected ? "hidden mobile:inline stroke-black" : "hidden"
        }`}
        onClick={handleProfileNavigation}
      />
    </div>
  );
}

export default Topbar;
