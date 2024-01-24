import { useFeedbacks } from "../../contexts/FeedbacksContext";
import { FeedbackCategory } from "./FeedbackCategory";

const categoryList = ["All", "UI", "UX", "Enhancement", "Feature", "Bug"];

export function FeedbackCategories() {
  const { activeFilter: active, setActiveFilter: setActive } = useFeedbacks();

  function handleClick(category) {
    setActive(category);
  }

  return (
    <div className=" rounded-xl p-6 bg-white shadow-sm">
      <ul className="flex flex-wrap gap-4">
        {categoryList.map((category) => (
          <FeedbackCategory
            key={category}
            category={category}
            isActive={active === category}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </div>
  );
}
