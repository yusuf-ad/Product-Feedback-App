import DropdownButton from "../UI/DropdownButton";

function SelectionField({
  select = "Category",
  selectMsg = "Choose a category for your feedback",
  menuItems,
  selected,
  action,
}) {
  return (
    <div>
      <label className="font-bold text-lg" htmlFor="category">
        {select}
      </label>
      <p className="text-gray-600 ">{selectMsg}</p>

      <DropdownButton
        selected={selected}
        menuItems={menuItems}
        action={action}
      />
    </div>
  );
}

export default SelectionField;
