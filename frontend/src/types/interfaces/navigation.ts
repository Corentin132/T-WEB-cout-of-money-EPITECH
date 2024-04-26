import { Overlay } from "@/types/interfaces/overlay";

/**
 * This interface represents all the links to display in the sidebar.
 */
export interface Navigation {
  /**
   * Is the list of links concerning cryptocurrencies
   * @type {NavigationLink[]}
   */
  crypto: NavigationLink[];

  /**
   * Is the list of links concerning the users
   * @type {NavigationLink[] | undefined}
   */
  user?: NavigationLink[];
}

/**
 * This interface represents the data structure of the navigation bar.
 * It represents the data needed to create the links and overlays in the sidebar.
 */
export interface NavigationLink {
  /**
   * Is the name of the link
   * @type {string}
   */
  name: string;

  /**
   * Is the path to navigate
   * @type {string | undefined}
   */
  path?: string;

  /**
   * Is the icon svg associated to the link
   * @type {React.FunctionComponent}
   */
  iconSvg: React.FunctionComponent;

  /**
   * Is the overlay interface containing required informations
   * @type {Overlay}
   */
  overlay?: Overlay;
}
