import Button from "@/components/elements/Button";
import { ArticleData } from "@/types/interfaces/news";
import GoldRushLogo from "assets/goldRushLogo.svg";

interface ArticleProps {
  /**
   * Is the article.
   * @type {ArticleData}
   */
  article: ArticleData;

  /**
   * Is the handle bookmark action
   * @returns void
   * @type {() => void}
   */
  handleBookmark: () => void;
}

function Article({ article, handleBookmark }: ArticleProps) {
  return (
    <article className="flex flex-col gap-8 tablet:gap-4 h-full w-11/12 mobile:w-full my-6 mobile:my-0 mx-auto mobile:mx-0 p-5 tablet:py-6 tablet:px-3 bg-white rounded-xl mobile:rounded-none">
      {/* Article title */}
      <h1 className="text-4xl tablet:text-xl font-bold">
        {article.info.title}
      </h1>
      {/* Article image */}
      <img
        src={article.info.image ? article.info.image : GoldRushLogo}
        alt={article.info.image ? "Article image" : "Gold Rush Logo"}
        className="max-h-96 laptop:max-h-72 tablet:max-h-44 rounded-xl bg-lightBluePrimary mx-16 laptop:mx-12 tablet:mx-9 mobile:mx-1"
      ></img>
      {/* Article Author and date */}
      <div className="flex flex-row tablet:flex-col italic justify-between px-2 tablet:px-0">
        <p className="">{article.info.creator}</p>
        <p className="">{article.info.pubDate}</p>
      </div>
      {/* Article Content */}
      <p
        className="text-justify"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></p>
      {/* Add To Bookmark */}
      <Button
        name={
          article.info.isArticleSaved ? "Added to Bookmark" : "Add to Bookmark"
        }
        type="button"
        color="bg-bluePrimary"
        onClick={handleBookmark}
        className="w-1/2 tablet:w-5/6 self-center"
      />
    </article>
  );
}

export default Article;
