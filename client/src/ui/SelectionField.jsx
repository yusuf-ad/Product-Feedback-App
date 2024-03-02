import { useState } from "react";

import DropdownMenu from "./DropdownMenu";
import { useClickOutside } from "../hooks/useClickOutside";

function SelectionField({ menuItems, name, setValue, active }) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const { menu, button: dropdownButton } = useClickOutside(() => {
    setIsMenuActive(false);
  });

  function toggleMenu() {
    setIsMenuActive(!isMenuActive);
  }

  function updateActive(newActive) {
    setValue(name, newActive);

    toggleMenu();
  }

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        ref={dropdownButton}
        onClick={toggleMenu}
        className="mt-5 h-14 w-full rounded-md border-2 border-transparent bg-grey-light px-6 shadow-sm transition-colors duration-100 hover:border-purple-default/50"
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

      <DropdownMenu
        isMenuActive={isMenuActive}
        ref={menu}
        items={menuItems}
        render={(item) => (
          <DropdownItem
            key={item}
            isActive={item === active}
            updateActive={updateActive}
          >
            {item}
          </DropdownItem>
        )}
      />
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
