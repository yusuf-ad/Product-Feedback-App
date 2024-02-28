const sortItems = [
  "Most upvotes",
  "Least upvotes",
  "Most comments",
  "Least comments",
];

function SortButton() {
  return (
    <div className="relative mt-1 flex items-center">
      <button className="text-white hover:text-grey-hover">
        <p>
          Sort by: <span className="mr-2 font-bold">{sortItems[0]}</span>
          <span>
            <i className="fa-solid fa-chevron-down text-xs"></i>
          </span>
        </p>
      </button>
      <div className="pointer-events-none absolute top-0 w-56 translate-y-0 rounded-xl bg-white opacity-0 shadow-sm duration-300 ">
        <ul>
          {sortItems.map((item) => (
            <SortItem key={item} isActive={sortItems[0] === item}>
              {item}
            </SortItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SortItem({ isActive, children }) {
  return (
    <li className="sortItem">
      {children}
      {isActive && (
        <span className="text-purple-default">
          <i className="fa-solid fa-check"></i>
        </span>
      )}
    </li>
  );
}

export default SortButton;
