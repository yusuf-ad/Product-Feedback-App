import { useEffect, useRef, useState } from "react";

const menuItems = ["Feature", "UI", "UX", "Enhancement", "Bug"];

function SelectionField({ name, register, setValue }) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [active, setActive] = useState(menuItems[0]);

  const menu = useRef(null);
  const dropdownButton = useRef(null);

  function toggleMenu() {
    setIsMenuActive(!isMenuActive);
  }

  function updateActive(newActive) {
    setActive(newActive);

    setValue(name, newActive);

    toggleMenu();
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        !menu.current.contains(e.target) &&
        !dropdownButton.current.contains(e.target)
      ) {
        setIsMenuActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="relative flex items-center">
      <button
        ref={dropdownButton}
        onClick={(e) => {
          e.preventDefault();

          toggleMenu();
        }}
        className=" mt-5 h-14 w-full rounded-md border-2 border-transparent bg-grey-light px-6 shadow-sm transition-colors duration-100 hover:border-purple-default/50"
      >
        <p className="flex justify-between">
          <span className="mr-2 text-lg text-gray-700">{active} </span>
          <span>
            <i
              className={`fa-solid fa-chevron-down text-sm text-blue-default transition duration-300 ${isMenuActive ? "rotate-180" : "rotate-0"}`}
            ></i>
          </span>
        </p>
      </button>
      {/* to get data from the form */}
      <input type="hidden" name="category" value={active} {...register(name)} />
      <div
        ref={menu}
        className={`${isMenuActive && "active"} pointer-events-none absolute top-2 z-20 w-full  translate-y-0 rounded-xl bg-white opacity-0 shadow-lg duration-300`}
      >
        <ul>
          {menuItems.map((item) => (
            <DropdownItem
              key={item}
              isActive={item === active}
              updateActive={updateActive}
            >
              {item}
            </DropdownItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DropdownItem({ isActive, children, updateActive }) {
  return (
    <li
      onClick={() => updateActive(children)}
      className="dropItem py-4 text-lg text-slate-500 "
    >
      {children}
      {isActive && (
        <span className="text-purple-default">
          <i className="fa-solid fa-check"></i>
        </span>
      )}
    </li>
  );
}

export default SelectionField;
