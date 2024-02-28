import { useSearchParams } from "react-router-dom";
import { FeedbackCategory } from "./FeedbackCategory";

const categoryList = ["All", "UI", "UX", "Enhancement", "Feature", "Bug"];

function FeedbackCategories() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory =
    searchParams.get("category") || categoryList[0].toLowerCase();

  function handleClick(category) {
    setSearchParams({ category: category.toLowerCase() });
  }

  return (
    <div className=" rounded-xl bg-white p-6 shadow-sm">
      <ul className="flex flex-wrap gap-4">
        {categoryList.map((category) => (
          <FeedbackCategory
            key={category}
            category={category}
            isActive={currentCategory === category.toLowerCase()}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default FeedbackCategories;
