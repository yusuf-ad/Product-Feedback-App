import { useEffect, useRef, useState } from "react";
import { useNewFeedback } from "../contexts/NewFeedbackContext";

function DropdownButton({
  menuItems = ["Feature", "UI", "UX", "Enhancement", "Bug"],
  selected = menuItems[0],
  action = "changeCategory",
}) {
  const [active, setActive] = useState(selected);

  const { dispatch } = useNewFeedback();

  useEffect(() => {
    setActive(selected);
  }, [selected]);

  const menu = useRef(null);

  function handleClick(e) {
    e.preventDefault();

    menu.current.classList.toggle("active");

    const dropItem = e.target.closest(".dropItem");

    if (!dropItem) return;

    setActive(dropItem.textContent);
  }

  useEffect(() => {
    dispatch({ type: action, payload: active });
  }, [active, action, dispatch]);

  return (
    <div onClick={handleClick} className=" relative mt-1 flex items-center">
      <button className="group/button mt-5 h-14 w-full rounded-md border-2 border-transparent bg-grey-light px-6 shadow-sm transition-colors duration-100 hover:border-purple-default/50">
        <p className="flex justify-between">
          <span className="mr-2 text-lg text-gray-700">{active}</span>
          <span>
            <i className="fa-solid fa-chevron-down  rotate-0 text-sm text-blue-default transition duration-300 group-focus/button:rotate-180"></i>
          </span>
        </p>
      </button>
      <div
        ref={menu}
        className="pointer-events-none absolute  top-8 z-20 w-full  translate-y-0 rounded-xl bg-white opacity-0 shadow-lg duration-300 "
      >
        <ul>
          {menuItems.map((item) => (
            <DropdownItem key={item} isActive={item === active}>
              {item}
            </DropdownItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DropdownItem({ isActive, children }) {
  return (
    <li className="dropItem py-4 text-lg text-slate-500 ">
      {children}
      {isActive && (
        <span className="text-purple-default">
          <i className="fa-solid fa-check"></i>
        </span>
      )}
    </li>
  );
}

export default DropdownButton;
