import * as React from "react";
import GoldRushLogo from "assets/goldRushLogo.svg";
import { useLocation } from "react-router-dom";
import { routesName } from "@/constants/routes";

interface AuthBannerContent {
  /**
   * This is the question in the auth banner
   * @type {string}
   */
  question: string;

  /**
   * This is the call to action. It will redirect the user to another page when clicked
   * @type {CallToAction}
   */
  callToAction: CallToAction;

  /**
   * This is the banner description
   * @type {string}
   */
  description: string;
}

interface CallToAction {
  /**
   * This is the call to Action label
   * @type {string}
   */
  label: string;

  /**
   * This is the path to redirect to
   * @type {string}
   */
  path: string;
}

/**
 * Is the banner content for the login page.
 */
const loginBannerContent: AuthBannerContent = {
  question: "Haven't Registered yet ?",
  callToAction: { label: "Create an account", path: routesName.register },
  description:
    "Master cryptocurrencies like never before. Join the Gold Rush community today!",
};

/**
 * Is the banner content for the register page.
 */
const registerBannerContent: AuthBannerContent = {
  question: "Already have an account ?",
  callToAction: { label: "Log in", path: routesName.login },
  description:
    "Master cryptocurrencies like never before. Join the Gold Rush community today!",
};

function AuthBanner() {
  const location = useLocation();
  const [banner, setBanner] = React.useState(loginBannerContent); // Use the login banner by default

  // Use the register banner if on register page
  if (
    location.pathname === routesName.register &&
    banner != registerBannerContent
  ) {
    setBanner(registerBannerContent);
  }

  return (
    <div className="grid grid-cols-1 justify-center w-full h-full px-10 laptop:px-2 rounded-r-3xl bg-bgGrey">
      <div className="self-center">
        <img
          src={GoldRushLogo}
          alt="Gold Rush Logo"
          className="aspect-square w-24 m-auto tablet:w-12"
        />
        <p className="text-center mt-3 text-3xl font-bold">Gold Rush</p>
      </div>
      <div className="text-center font-semibold">
        <div className="text-bluePrimary text-xl mb-7">
          <p id="question" className="mb-2">
            {banner.question}
          </p>
          <a href={banner.callToAction.path}>
            <p id="callToAction" className="underline">
              {banner.callToAction.label}
            </p>
          </a>
        </div>
        <p id="description">{banner.description}</p>
      </div>
    </div>
  );
}

export default AuthBanner;
