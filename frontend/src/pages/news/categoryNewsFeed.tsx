import CategoryNews from "@/components/news/CategoryNews";
import { routesParamsName } from "@/constants/routes";
import { getCategoryNewsFeed } from "@/middlewares/news";
import { NewsCardData } from "@/types/interfaces/news";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function CategoryNewsFeed() {
  const [newsFeed, setNewsFeed] = useState<NewsCardData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Find the category route param in url
  const { [routesParamsName.newsCategory]: newsCategoryName } = useParams();
  const newsCategoryId = location.state.categoryId;

  // fetch news feed from selected category in query param.
  const getCategoryNewsFeedData = async () => {
    setIsLoading(true);

    // Check if the params exist or navigate to previous page.
    if (!newsCategoryName || !newsCategoryId) {
      setIsLoading(false);
      navigate(-1);
    }

    try {
      const data = await getCategoryNewsFeed(newsCategoryName!, newsCategoryId);
      setNewsFeed(data);
    } catch (error) {
      navigate(-1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategoryNewsFeedData();
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

export default CategoryNewsFeed;
