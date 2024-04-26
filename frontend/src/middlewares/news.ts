import {
  NewsFeedData,
  ArticleData,
  NewsCardData,
} from "@/types/interfaces/news";

/**
 * This function fetchs the news feed.
 * @returns
 */
export async function getNewsFeeds(): Promise<NewsCardData[]> {
  const response = await fetch("http://localhost:4000/feed/getAllFeedItems", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const feeds = await response.json();

  const sortfeed = feeds.sort(
    (
      a: { pubDate: string | number | Date },
      b: { pubDate: string | number | Date }
    ) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    }
  );

  return sortfeed;
}

/**
 * This function fetchs articles for the general news feed page.
 * The trending news should be limited to 8 articles and every other categories should be limited between 6-9 articles.
 *
 * @returns A promise of NewsFeedData
 */
export const getGeneralNewsFeed = async (): Promise<NewsFeedData> => {
  // TODO: Fetch data from api
  // TODO: DELETE THIS AND USE API return instead
  const newsfeedData: NewsFeedData = {
    trending: {
      categoryId: "is categfehtory id",
      categoryName: "Trending",
      feed: [
        {
          creator: "John Sponge",
          identifier: "fezfez sfdz dzfdz wsefa",
          pubDate: "2015-09-43",
          title: "is article magnificient name",
          isArticleSaved: false,
          link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
        },
      ],
    },
    categories: [
      {
        categoryId: "is catjytjtegory id",
        categoryName: "Bitcoin",
        feed: [
          {
            creator: "John Sponge",
            identifier: "fezfezbzffds fezfdsf zsqtefa",
            pubDate: "2015-09-43",
            title: "is article magnificient name",
            isArticleSaved: false,
            link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
          },
        ],
      },
      {
        categoryId: "is categorjuyjy id",
        categoryName: "Bitcoin",
        feed: [],
      },
    ],
  };
  return await newsfeedData;
};

/**
 * This function fetchs articles for a specific news category.
 * No number of article limitation in expected until a refresh button is added.
 *
 * @param newsCategoryName Is the news category's name to fetch the feed from.
 * @param newsCategoryId Is the news category's id to fetch the feed from
 */
export const getCategoryNewsFeed = async (
  newsCategoryName: string,
  newsCategoryId: string
): Promise<NewsCardData[]> => {
  // TODO: Fetch a news category feed.
  console.log(newsCategoryName + " | " + newsCategoryId);
  // TODO: Delete this to take api return value in stead.
  const categoryNews: NewsCardData[] = [
    {
      creator: "John Sponge",
      identifier: "fezfezbzffds fezfdsf zsqtefa",
      pubDate: "2015-09-43",
      title: "is article magnificient name",
      isArticleSaved: false,
      link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
    },
  ];

  return await categoryNews;
};

/**
 * This function fetchs the news feed for the CryptoOverview page.
 * It uses the the crypto identifier to determine which feed needs to be fetched.
 * Beware, cyptoId and categoryId isn't the same!
 * This function should return 6 articles maximum!
 * @param cryptoId Is the crypto currency id
 */
export const getCryptoOverviewNewsFeed = async (
  cryptoId: string
): Promise<NewsCardData[]> => {
  if (cryptoId === undefined) {
    throw Error("Invalid crypto id");
  }
  // TODO: Fetch a crypto overview news feed.
  console.log(cryptoId);
  // TODO: Delete this to take api return value in stead.
  let categoryNews: NewsCardData[] = [
    {
      creator: "John Sponge",
      identifier: "fezfezbzffds fezfdsf zsqtefa",
      pubDate: "2015-09-43",
      title: "is article magnificient name",
      isArticleSaved: false,
      link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
    },
    {
      creator: "John Sponge",
      identifier: "fezfezbzfezffds fezfdsf zsqtefa",
      pubDate: "2015-09-43",
      title: "is article magnificient name",
      isArticleSaved: false,
      link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
    },
    {
      creator: "John Sponge",
      identifier: "fezfezbzvvvvffds fezfdsf zsqtefa",
      pubDate: "2015-09-43",
      title: "is article magnificient name",
      isArticleSaved: false,
      link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
    },
    {
      creator: "John Sponge",
      identifier: "fezfezbaaazffds fezfdsf zsqtefa",
      pubDate: "2015-09-43",
      title: "is article magnificient name",
      isArticleSaved: false,
      link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
    },
    {
      creator: "John Sponge",
      identifier: "fezfedzaezbzffds fezfdsf zsqtefa",
      pubDate: "2015-09-43",
      title: "is article magnificient name",
      isArticleSaved: false,
      link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
    },
    {
      creator: "John Sponge",
      identifier: "fezddfdzzfezbzffds fezfdsf zsqtefa",
      pubDate: "2015-09-43",
      title: "is article magnificient name",
      isArticleSaved: false,
      link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
    },
  ];

  // Slice array if too long!
  if (categoryNews && categoryNews.length > 6) {
    categoryNews = categoryNews.slice(0, 6);
  }

  return await categoryNews;
};

/**
 * This function handles the article bookmark status.
 * The api will set the value to the opposite of what it is. Meaning it will set it to true or false depending on the value already stored.
 * @param articleId is the article Id
 */
export const handleArticleBookmark = async (
  articleId: string
): Promise<boolean> => {
  // TODO: make fetch request to add or remove article from bookmark
  console.log(articleId);
  return true;
};

/**
 * This function fetchs the article from the api by article Id.
 * @param articleId is a string representing the article identifier
 * @returns an ArticleData object
 */
export const getArticle = async (articleId: string): Promise<ArticleData> => {
  // TODO: Fetch article from api
  // DELETE This example
  console.log(articleId);
  const article: ArticleData = {
    info: {
      creator: "John Sponge",
      identifier: "fezfezbzffds fezfdsf zsqtefa",
      pubDate: "2015-09-43",
      title: "is article magnificient name",
      isArticleSaved: false,
      link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
    },
    content:
      "<p>This is a longer article that provides in-depth information on a particular topic.</p><h2>Introduction</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in urna vitae odio posuere fringilla.</p><h2>Main Content</h2><p>Curabitur tincidunt vestibulum justo, in feugiat lacus congue vel. Praesent eget justo in arcu euismod posuere.</p><p>Sed eu metus vel lacus interdum ultricies a sit amet nunc. Integer id enim nec ipsum ultricies tincidunt. Fusce venenatis ex id metus pellentesque, at vehicula turpis malesuada.</p><h2>Conclusion</h2><p>Donec facilisis vehicula sem, eu efficitur dolor fermentum sit amet. Nullam varius dapibus tellus ut iaculis. Vestibulum et dolor ac libero fermentum sollicitudin nec eu ligula.</p>",
  };

  return await article;
};

export const getBookmarkFeed = async (): Promise<NewsCardData[]> => {
  // TODO: Fetch a news category feed.
  // TODO: Delete this to take api return value instead.
  const bookmark: NewsCardData[] = [
    {
      creator: "John Sponge",
      identifier: "fezfezbzffds fezfdsf zsqtefa",
      pubDate: "2015-09-43",
      title: "is article magnificient name",
      isArticleSaved: false,
      link: "https://tvmag.lefigaro.fr/programme-tv/actu-tele/je-n-ai-pas-menti-anouchka-delon-repond-aux-accusations-de-son-frere-anthony-delon-dans-le-jt-de-tf1-20240107",
    },
  ];

  return await bookmark;
};
