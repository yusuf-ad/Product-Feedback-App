import { useNewFeedback } from "../../contexts/NewFeedbackContext";
import Error from "../UI/Error";

function TextAreaField() {
  const {
    detailsInput,
    details,
    dispatch,
    detailsError: error,
  } = useNewFeedback();

  function handleChange(e) {
    dispatch({ type: "changeDetails", payload: e.target.value });

    if (!e.target.value.trim())
      dispatch({ type: "detailsError", payload: "Can't be empty" });
    else dispatch({ type: "detailsError", payload: "" });
  }

  return (
    <div>
      <label className="font-bold text-lg" htmlFor="detail">
        Feedback Detail
      </label>
      <p className="text-gray-600 ">
        Include any specific comments on what should be improved, added, etc.
      </p>
      <textarea
        ref={detailsInput}
        value={details}
        onChange={handleChange}
        className={`shadow-sm mt-5 bg-grey-light h-24 px-6 py-4 rounded-md w-full resize-none ${
          error
            ? "outline-red-default/70 text-red-default"
            : "outline-purple-default/50"
        } `}
        name="feedback-detail"
        id="detail"
        maxLength={255}
      ></textarea>
      {error && <Error message="Can't be empty" />}
    </div>
  );
}

export default TextAreaField;
