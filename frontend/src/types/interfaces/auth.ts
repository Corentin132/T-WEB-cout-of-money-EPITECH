/**
 *  Is the login form interface
 */
export interface AuthLoginForm {
  /**
   * Is the login email
   * @type {string}
   */
  email: string;

  /**
   * Is the login password
   * @type {string}
   */
  password: string;
}
export interface AuthRegisterForm {
  /**
   * Is the login email
   * @type {string}
   */
  email: string;

  /**
   * Is the login username
   * @type {string}
   */
  username: string;
  /**
   * Is the login password
   * @type {string}
   */
  /**
   * Is the login role
   * @type {string}
   */
  role: string;
  password: string;
  /**
   * Is the login confirmPassword
   * @type {string}
   */
  passwordConfirm: string;
}
