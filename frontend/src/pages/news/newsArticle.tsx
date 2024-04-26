import Article from "@/components/news/Article";
import { routesParamsName } from "@/constants/routes";
import { getArticle, handleArticleBookmark } from "@/middlewares/news";
import { ArticleData } from "@/types/interfaces/news";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NewsArticle() {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Find the article Id in route param
  const { [routesParamsName.articleId]: articleId } = useParams();

  // Fetch article from api
  const getNewsArticle = async () => {
    // Check if the params exist or navigate to previous page.
    if (!articleId) {
      navigate(-1);
    }

    setIsLoading(true);

    try {
      const data = await getArticle(articleId!);
      setArticle(data);
    } catch (error) {
      navigate(-1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNewsArticle();
  }, []);

  const handleBookmark = async () => {
    // Check article isn't null!
    if (!article) {
      return;
    }

    // Make api call to handle article status in bookmark
    const isArticleSaved: boolean = await handleArticleBookmark(
      article!.info.identifier
    );

    // Set the is Article Saved value back.
    setArticle({
      ...article!,
      info: {
        ...article!.info,
        isArticleSaved: isArticleSaved,
      },
    });
  };

  if (isLoading || !article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <Article article={article!} handleBookmark={handleBookmark} />
    </div>
  );
}

export default NewsArticle;
