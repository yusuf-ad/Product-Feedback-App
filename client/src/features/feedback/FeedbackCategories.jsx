import { FeedbackCategory } from "./FeedbackCategory";

const categoryList = ["All", "UI", "UX", "Enhancement", "Feature", "Bug"];

function FeedbackCategories() {
  return (
    <div className=" rounded-xl bg-white p-6 shadow-sm">
      <ul className="flex flex-wrap gap-4">
        {categoryList.map((category) => (
          <FeedbackCategory
            key={category}
            category={category}
            isActive={"All" === category}
          />
        ))}
      </ul>
    </div>
  );
}

export default FeedbackCategories;
