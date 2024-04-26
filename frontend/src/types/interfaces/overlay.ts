/**
 * This interface represents the required informations to construct the overlay component
 */
export interface Overlay {
  /**
   * Is the overlay title
   * @type {string}
   */
  title: string;

  /**
   * Is the overlay message
   * @type {string}
   */
  message: string;

  /**
   * Is the overlay button name
   * @type {string}
   */
  buttonName: string;

  /**
   * Is the overlay button type
   * @type {"button" | "submit" | "reset" | undefined}
   */
  buttonType: "button" | "submit" | "reset" | undefined;

  /**
   * Is the overlay button color in tailwind format (bg-bluePrimary for example)
   * @type {string}
   */
  buttonColor: string;

  /**
   * Is the overlay button action
   * @type {() => void}
   */
  buttonAction: () => void;
}
