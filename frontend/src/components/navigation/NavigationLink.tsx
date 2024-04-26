import { useState } from "react";
import { NavigationLink } from "@/types/interfaces/navigation";
import AlertDialog from "@/components/overlay/AlertDialog";
import { routesName } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

interface NavigationLinkProps {
  /**
   * Is the navigation link interface
   * @type {NavigationLink}
   */
  navigationLink: NavigationLink;

  /**
   * Is the active state of the link. It represents whether we are on the page of this link
   * @type {boolean}
   */
  isActive: boolean;
}

function NavigationLink({ navigationLink, isActive }: NavigationLinkProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  const handleNavigation = () => {
    if (navigationLink.overlay != undefined) {
      // Open the overlay logic
      handleOpenOverlay();
    } else {
      // Navigate to the specified page
      console.log(navigationLink.path);
      navigate(
        navigationLink.path != undefined
          ? navigationLink.path
          : routesName.dashboard
      );
    }
  };

  return (
    <>
      <button
        type="button"
        className={`${
          isActive
            ? "bg-bluePrimary text-white stroke-white"
            : "hover:text-bluePrimary hover:bg-lightBluePrimary hover:stroke-bluePrimary text-grey stroke-grey"
        }  
              grid grid-cols-5 w-full items-center mb-2 pl-2 rounded-r-xl no-underline`}
        onClick={handleNavigation}
      >
        <div className="tablet:col-span-1 col-start-1 col-span-2 justify-self-center aspect-square fill-none">
          <navigationLink.iconSvg />
        </div>
        <p className="col-span-3 justify-self-start tablet:col-span-4 tablet:text-sm tablet:justify-self-center">
          {navigationLink.name}
        </p>
      </button>

      {navigationLink.overlay != undefined && (
        <AlertDialog
          overlayInfo={navigationLink.overlay}
          onOpen={isOverlayOpen}
          onClose={handleCloseOverlay}
          onAction={navigationLink.overlay.buttonAction}
        />
      )}
    </>
  );
}

export default NavigationLink;
