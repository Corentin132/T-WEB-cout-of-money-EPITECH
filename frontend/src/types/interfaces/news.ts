/**
 * This interface represents the data needed to create a news card.
 * It holds the basic informations about the article
 * It is also used to render the article page.
 */
export interface NewsCardData {
  /**
   * Is the article identifier used to navigate towards the article page.
   * @type {string}
   */
  identifier: string;

  /**
   * Is the optional article image's link.
   * @type {string | undefined}
   */
  image?: string | undefined;

  /**
   * Is the article author
   * @type {string}
   */
  creator: string;

  /**
   * Is the article publication date
   * @type {string}
   */
  pubDate: string;

  /**
   * Is the article title
   * @type {string}
   */
  title: string;

  /**
   * Is the article link
   * @type {string}
   */
  link: string;

  /**
   * Is the article saved in the bookmark
   * @type {boolean}
   */
  isArticleSaved: boolean;
}

/**
 * This interface represents the general news feed data that represents the latest news and a list of categories
 */
export interface NewsFeedData {
  /**
   * Is the trending articles section that is always displayed, not depending on user preferences.
   * @type {CategoryNewsFeedData}
   */
  trending: CategoryNewsFeedData;

  /**
   * Is a list of news categories to display depending on user preferences.
   * @type {CategoryNewsFeedData[]}
   */
  categories: CategoryNewsFeedData[];
}

/**
 * This interface represents a news category and its feed of articles.
 */
export interface CategoryNewsFeedData {
  /**
   * Is the news category identifier
   * @type {string}
   */
  categoryId: string;
  /**
   * Is the category name to display.
   * @type {string}
   */
  categoryName: string;
  /**
   * Is the feed of article for this category
   * @type {NewsCardData[]}
   */
  feed: NewsCardData[];
}

/**
 * This interface represents the whole article data
 */
export interface ArticleData {
  /**
   * Is the basic informations about the article.
   * @type {NewsCardData}
   */
  info: NewsCardData;

  /**
   * Is the content of the article
   * @type {string}
   */
  content: string;
}
