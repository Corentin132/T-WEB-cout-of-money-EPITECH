import { NewsCardData } from "@/types/interfaces/news";
import NewsCard from "./NewsCard";
// import TitleNews from "./TitleNews";
import NoArticlesFound from "./NoArticlesFound";

interface CategoryNewsProps {
  /**
   * Is the category news feed.
   * @type {NewsCardData[]}
   */
  categoryNewsFeed: NewsCardData[];

  /**
   * Is the boulean to display the see more button for the category.
   * To be set to true when in the NewsFeed page and to false when in a specific category page already like CategoryNewsFeed.
   * @type {boolean}
   */
  displayCategorySeeMoreButton: boolean;
}

function CategoryNews({ categoryNewsFeed }: CategoryNewsProps) {
  return (
    <div className="flex flex-col gap-y-3 h-full w-full">
      {/* <TitleNews
        categoryId={categoryNewsFeed.categoryId}
        categoryName={categoryNewsFeed.categoryName}
        displaySeeMoreButton={
          categoryNewsFeed.feed.length > 0
            ? displayCategorySeeMoreButton
            : false
        }
      /> */}
      <h2 className="text-3xl font-bold">Other News</h2>

      <div className="min-h-0 grid gap-4 grid-cols-3 mobile:grid-cols-1 laptop:grid-cols-2">
        {categoryNewsFeed.length > 0 ? (
          categoryNewsFeed.map((newsCard) => (
            <NewsCard newsCard={newsCard} key={newsCard.identifier} />
          ))
        ) : (
          // Case of empty feed
          <NoArticlesFound />
        )}
      </div>
    </div>
  );
}

export default CategoryNews;
