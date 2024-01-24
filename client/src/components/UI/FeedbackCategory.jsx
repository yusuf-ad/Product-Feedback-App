export function FeedbackCategory({ category, isActive, handleClick }) {
  return (
    <li
      onClick={() => handleClick(category)}
      className={`feedbackCategory  ${
        isActive ? "bg-blue-default text-white" : "hover:bg-grey-hover "
      } `}
    >
      {category}
    </li>
  );
}
