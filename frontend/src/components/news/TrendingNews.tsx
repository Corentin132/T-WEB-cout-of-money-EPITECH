import theme from "@/theme";
import { useMediaQuery } from "@mui/material";
import { NewsCardData } from "@/types/interfaces/news";
import NewsCard from "./NewsCard";
// import TitleNews from "./TitleNews";

interface TrendingNewsProps {
  /**
   * Is the trending news feed.
   * The list of article has to be limited to height articles for this component.
   * @type {NewsCardData[]}
   */
  trendingNewsFeed: NewsCardData[];
}

function TrendingNews({ trendingNewsFeed }: TrendingNewsProps) {
  const isLaptopWidth = useMediaQuery(theme.breakpoints.down("desktop"));

  return (
    <div className="flex flex-col gap-y-3 h-full w-full">
      {/* <TitleNews
        categoryId={trendingNewsFeed.categoryId}
        categoryName={trendingNewsFeed.categoryName}
        displaySeeMoreButton={true}
      /> */}
      <h2 className="text-3xl font-bold">Trending</h2>

      {isLaptopWidth ? ( // If device is laptop size or smaller, use simple layout
        <div className="min-h-0 grid gap-4 mobile:grid-cols-1 laptop:grid-cols-2">
          {trendingNewsFeed.map((newsCard) => (
            <div key={newsCard.identifier}>
              <NewsCard newsCard={newsCard} />
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-0 grid grid-cols-5 grid-rows-3 gap-x-4">
          <div className="col-span-2 row-span-3 grid grid-cols-1 grid-rows-2 gap-y-2">
            {trendingNewsFeed.slice(0, 2).map((newsCard) => (
              <div key={newsCard.identifier}>
                <NewsCard newsCard={newsCard} />
              </div>
            ))}
          </div>
          <div className="col-span-3 row-span-3 grid grid-cols-2 grid-rows-3 gap-x-2 gap-y-2">
            {trendingNewsFeed.slice(2, 8).map((newsCard) => (
              <div key={newsCard.identifier}>
                <NewsCard newsCard={newsCard} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrendingNews;
