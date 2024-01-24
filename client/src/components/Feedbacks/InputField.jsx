import { useNewFeedback } from "../../contexts/NewFeedbackContext";
import Error from "../UI/Error";

function InputField() {
  const { titleInput, title, dispatch, titleError: error } = useNewFeedback();

  function handleChange(e) {
    dispatch({ type: "changeTitle", payload: e.target.value });

    if (!e.target.value.trim())
      dispatch({ type: "titleError", payload: "Can't be empty" });
    else dispatch({ type: "titleError", payload: "" });
  }

  return (
    <div>
      <label className="font-bold text-lg" htmlFor="title">
        Feedback Title
      </label>
      <p className="text-gray-600 ">Add a short, descriptive headline</p>
      <input
        ref={titleInput}
        value={title}
        onChange={handleChange}
        className={`shadow-sm mt-5 bg-grey-light px-6 h-14 rounded-md w-full ${
          error
            ? "outline-red-default/70 text-red-default"
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
