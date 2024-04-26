import { complexRoutePath, routesParamsName } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

interface TitleNewsProps {
  /**
   * Is the category name to navigate to.
   * @type {string}
   */
  categoryName: string;

  /**
   * Is the category id to navigate to.
   * @type {string}
   */
  categoryId: string;

  /**
   * Is the display see More Button. It allows to display or not the button.
   * @type {boolean}
   */
  displaySeeMoreButton: boolean;
}

function TitleNews({
  categoryName,
  categoryId,
  displaySeeMoreButton = false,
}: TitleNewsProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate towards the category feed with the category name as the path and the category id in the state.
    navigate(
      complexRoutePath.newsCategoryPath.replace(
        `:${routesParamsName.newsCategory}`,
        categoryName
      ),
      { state: { categoryId: categoryId } }
    );
  };

  return (
    <div className="flex flex-row justify-between">
      <h2 className="text-3xl font-bold">{categoryName}</h2>
      <button
        type="button"
        onClick={handleClick}
        className={`${
          displaySeeMoreButton ? "text-bluePrimary hover:underline" : "hidden"
        }`}
      >
        See more
      </button>
    </div>
  );
}

export default TitleNews;
