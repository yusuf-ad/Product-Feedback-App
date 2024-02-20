import { forwardRef } from "react";

const DropdownMenu = forwardRef(({ items, render }, ref) => (
  <div
    ref={ref}
    className="active pointer-events-auto absolute top-2 z-20 w-full translate-y-0 rounded-xl bg-white opacity-100 shadow-lg duration-300"
  >
    <ul>{items.map(render)}</ul>
  </div>
));

DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;
