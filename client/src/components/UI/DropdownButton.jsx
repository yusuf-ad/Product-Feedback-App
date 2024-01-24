import { useEffect, useRef, useState } from "react";
import { useNewFeedback } from "../../contexts/NewFeedbackContext";

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
    <div onClick={handleClick} className=" relative flex items-center mt-1">
      <button className="group/button mt-5 bg-grey-light px-6 h-14 rounded-md w-full border-2 border-transparent transition-colors duration-100 hover:border-purple-default/50 shadow-sm">
        <p className="flex justify-between">
          <span className="text-gray-700 text-lg mr-2">{active}</span>
          <span>
            <i className="text-blue-default rotate-0  text-sm fa-solid fa-chevron-down transition duration-300 group-focus/button:rotate-180"></i>
          </span>
        </p>
      </button>
      <div
        ref={menu}
        className="absolute z-20  top-8 rounded-xl w-full  bg-white shadow-lg translate-y-0 duration-300 opacity-0 pointer-events-none "
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
    <li className="dropItem text-lg text-slate-500 py-4 ">
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
