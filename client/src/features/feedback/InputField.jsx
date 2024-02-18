import { useNewFeedback } from "../../contexts/NewFeedbackContext";
import Error from "../../ui/Error";

function InputField({ currentTitle }) {
  const { titleInput, title, dispatch, titleError: error } = useNewFeedback();

  function handleChange(e) {
    dispatch({ type: "changeTitle", payload: e.target.value });

    if (!e.target.value.trim())
      dispatch({ type: "titleError", payload: "Can't be empty" });
    else dispatch({ type: "titleError", payload: "" });
  }

  return (
    <div>
      <label className="text-lg font-bold" htmlFor="title">
        Feedback Title
      </label>
      <p className="text-gray-600 ">Add a short, descriptive headline</p>
      <input
        ref={titleInput}
        defaultValue={currentTitle}
        value={title}
        onChange={handleChange}
        className={`mt-5 h-14 w-full rounded-md bg-grey-light px-6 shadow-sm ${
          error
            ? "text-red-default outline-red-default/70"
            : "outline-purple-default/50"
        }`}
        id="title"
        type="text"
      />
      {error && <Error message="Can't be empty" />}
    </div>
  );
}

export default InputField;
