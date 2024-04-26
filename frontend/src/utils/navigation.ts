/// <reference types="vite-plugin-svgr/client" />

import { Navigation, NavigationLink } from "@/types/interfaces/navigation";
import { routesName } from "@/constants/routes";
import DashboardIcon from "assets/dashboardIcon.svg?react";
import NewsIcon from "assets/newsIcon.svg?react";
import BookmarkIcon from "assets/bookmarkIcon.svg?react";
import UserIcon from "assets/userIcon.svg?react";
import OnButtonIcon from "assets/onButtonIcon.svg?react";
import { Cookies } from "react-cookie";

// Define here all sidebar Navigation Links related to cryptocurrencies

const dashboard: NavigationLink = {
  name: "Dashboard",
  path: routesName.dashboard,
  iconSvg: DashboardIcon,
};

const news: NavigationLink = {
  name: "News",
  path: routesName.news,
  iconSvg: NewsIcon,
};

// const bookmark: NavigationLink = {
//   name: "Bookmark",
//   path: routesName.bookmark,
//   iconSvg: BookmarkIcon,
// };

// Define here all sidebar Navigation Links related to the user

const profile: NavigationLink = {
  name: "Profile",
  path: routesName.profile,
  iconSvg: UserIcon,
};

const logout: NavigationLink = {
  name: "Log Out",
  iconSvg: OnButtonIcon,
  overlay: {
    title: "Log Out",
    message: "Are you sure you want to log out ?",
    buttonName: "Sure",
    buttonType: "button",
    buttonColor: "bg-bluePrimary",
    buttonAction: () => {
      const cookie = new Cookies();
      cookie.remove("access_token");
    },
  },
};

// Define here alla routes related to the admin
const adminRss: NavigationLink = {
  name: "Admin",
  path: routesName.admin,
  iconSvg: BookmarkIcon,
};

/**
 * This is all the links in the sidebar for a logged user
 */
export const loggedInSidebar: Navigation = {
  crypto: [dashboard, news],
  user: [profile, logout],
};

/**
 * This is all the links in the sidebar for a logged out user
 */
export const loggedOutSidebar: Navigation = {
  crypto: [dashboard, news],
};

/**
 * This is all the links in the sidebar for an admin
 */
export const adminSidebar: Navigation = {
  crypto: [dashboard, news, adminRss],
  user: [profile, logout],
};

/**
 * This is all the links in the bottombar for a logged user
 */
export const loggedInBottombar: Navigation = {
  crypto: [news, dashboard],
};

/**
 * This is all the links in the bottombar for a logged out user
 */
export const loggedOutBottombar: Navigation = {
  crypto: [news, dashboard],
};
