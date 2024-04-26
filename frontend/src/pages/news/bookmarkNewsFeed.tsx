import CategoryNews from "@/components/news/CategoryNews";
import { getBookmarkFeed } from "@/middlewares/news";
import { NewsCardData } from "@/types/interfaces/news";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookmarkNewsFeed() {
  const [newsFeed, setNewsFeed] = useState<NewsCardData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getNewsFeed = async () => {
    setIsLoading(true);
    try {
      // Fetch data from url and set it
      const data = await getBookmarkFeed();
      setNewsFeed(data);
    } catch (error) {
      navigate(-1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNewsFeed();
  }, []);

  if (isLoading || newsFeed === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-news-feed">
      <CategoryNews
        categoryNewsFeed={newsFeed}
        displayCategorySeeMoreButton={false}
      />
    </div>
  );
}

export default BookmarkNewsFeed;
