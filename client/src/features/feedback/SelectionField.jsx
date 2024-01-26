import DropdownButton from "../../ui/DropdownButton";

function SelectionField({
  select = "Category",
  selectMsg = "Choose a category for your feedback",
  menuItems,
  selected,
  action,
}) {
  return (
    <div>
      <label className="text-lg font-bold" htmlFor="category">
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
