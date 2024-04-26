import CategoryNews from "@/components/news/CategoryNews";
import TrendingNews from "@/components/news/TrendingNews";
import { getNewsFeeds } from "@/middlewares/news";
import { NewsCardData } from "@/types/interfaces/news";
import { useEffect, useState } from "react";

function NewsFeed() {
  const [newsFeedData, setNewsFeedData] = useState<NewsCardData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch news feed data depending on user preferences
  const getNewsFeedData = async () => {
    setIsLoading(true);
    try {
      const data = await getNewsFeeds();
      setNewsFeedData(data);
    } catch (error) {
      console.error("error while fetching news data"); // TODO: Handle errors
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNewsFeedData();
  }, []);

  if (isLoading || newsFeedData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 mobile:gap-5 p-4 justify ">
      {/* Trending News */}
      <div className="laptop:h-full h-128 w-11/12 tablet:w-full self-center">
        <TrendingNews trendingNewsFeed={newsFeedData.slice(0, 8)} />
      </div>
      {/* News feed */}
      <div className="flex flex-col gap-8 w-5/6 tablet:w-full self-center">
        <CategoryNews
          categoryNewsFeed={newsFeedData.slice(8)}
          displayCategorySeeMoreButton={true}
        />
      </div>
    </div>
  );
}

export default NewsFeed;
