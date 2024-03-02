import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { useClickOutside } from "../hooks/useClickOutside";

const sortItems = [
  "Most upvotes",
  "Least upvotes",
  "Most comments",
  "Least comments",
];

function SortButton() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuActive, setIsMenuActive] = useState(false);

  const sortBy = searchParams.get("sortBy") || sortItems[0].toLowerCase();

  const { button, menu } = useClickOutside(() => setIsMenuActive(false));

  function handleToggle() {
    setIsMenuActive(!isMenuActive);
  }

  function handleSelect(item) {
    searchParams.set("sortBy", item.toLowerCase());
    setSearchParams(searchParams);

    setIsMenuActive(false);
  }

  return (
    <div className="relative mt-1 flex items-center">
      <button
        ref={button}
        onClick={handleToggle}
        className="text-white hover:text-grey-hover"
      >
        <p>
          Sort by:{" "}
          <span className="mr-2 font-bold">
            {capitalizeFirstLetter(sortBy)}
          </span>
          <span>
            <i className="fa-solid fa-chevron-down text-xs"></i>
          </span>
        </p>
      </button>

      <div
        ref={menu}
        className={`${isMenuActive ? "active translate-y-14" : ""} pointer-events-none absolute top-0 w-56 translate-y-0 rounded-xl bg-white opacity-0 shadow-sm duration-300`}
      >
        <ul>
          {sortItems.map((item) => (
            <SortItem
              key={item}
              isActive={sortBy === item.toLowerCase()}
              handleSelect={handleSelect}
            >
              {item}
            </SortItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SortItem({ isActive, children, handleSelect }) {
  return (
    <li onClick={() => handleSelect(children)} className="sortItem">
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
