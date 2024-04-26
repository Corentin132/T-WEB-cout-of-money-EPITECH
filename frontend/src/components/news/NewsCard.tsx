import GoldRushLogo from "assets/goldRushLogo.svg";
import BookmarkIcon from "assets/bookmarkIcon.svg?react";
import { NewsCardData } from "@/types/interfaces/news";
import { handleArticleBookmark } from "@/middlewares/news";

interface NewsCardProps {
  /**
   * Is the news card interface needed to create the NewsCard component
   * @type {NewsCardData}
   */
  newsCard: NewsCardData;
}

function NewsCard({ newsCard }: NewsCardProps) {
  const handleBookmark = async () => {
    // Make api call to handle article status in bookmark
    const isArticleSaved: boolean = await handleArticleBookmark(
      newsCard.identifier
    );
    // TODO: Improve system and update the state directly in parent as the user won't know it has been added.
    console.log(isArticleSaved);
  };

  const DateFormat = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `, ${month} ${day}, ${year}`;
  };

  return (
    <div className="flex flex-col h-full max-h-48 w-full rounded-xl bg-lightBluePrimary relative">
      {/* Bookmark Icon */}
      <button
        type="button"
        onClick={handleBookmark}
        className={`${
          newsCard.isArticleSaved
            ? "fill-bluePrimary hover:fill-lightBluePrimary"
            : "fill-none hover:fill-bluePrimary"
        } absolute top-2 right-2 stroke-bluePrimary`}
      >
        <BookmarkIcon />
      </button>
      {/* Article image */}
      <img
        src={newsCard.image ? newsCard.image : GoldRushLogo}
        alt={newsCard.image ? "Article image" : "Gold Rush Logo"}
        className={`${
          newsCard.image ? "w-full" : "w-1/2"
        } basis-3/5 h-3/5 mb-2 object-cover self-center mobile:mb-1 rounded-t-xl bg-`}
      ></img>
      <a
        href={newsCard.link}
        className="basis-2/5 flex flex-col w-full px-2 text-left hover:underline hover:text-black"
      >
        {/* Article Writer and date */}
        <div className="flex flex-row justify-between italic text-sm w-full">
          <p>{newsCard.creator}</p>
          <p>{DateFormat(newsCard.pubDate)}</p>
        </div>
        {/* Article title */}
        <h2 className="w-full font-bold tracking-tight leading-tight line-clamp-1">
          {newsCard.title}
        </h2>
      </a>
    </div>
  );
}

export default NewsCard;
