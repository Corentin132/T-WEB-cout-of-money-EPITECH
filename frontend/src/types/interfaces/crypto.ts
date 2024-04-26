/**
 * Is the Crypto Ticker values needed to render the CryptoTicker component
 */
export interface CryptoTickerData {
  // TODO: Revoir le nom des champs

  /**
   * Is the crypto identifier
   */
  identifier: string;
  /**
   * Is the crypto logo url
   */
  logoUrl: string;

  /**
   * Is the crypto name
   */
  name: string;

  /**
   * Is the Crypto trigram
   */
  trigram: string;

  /**
   * Is the crypto current price
   */
  price: string;

  /**
   * Is the Crypto percentage evolution in 24 hours
   */
  evolutionOneDay: string;

  /**
   * Is the Crypto percentage evolution in 7 days
   */
  evolutionOneWeek: string;

  /**
   * Is the Crypto total price
   */
  totalePrice: string;

  /**
   * Is the Crypto total amount
   */
  totalAmount: string;
}

export interface CryptoAboutData {
  /**
   * Is the origin of this cryptocurrency
   * @type {string}
   */
  origins: string;

  /**
   * Is the summary of what is this cryptocurrency
   * @type {string}
   */
  summary: string;
}
