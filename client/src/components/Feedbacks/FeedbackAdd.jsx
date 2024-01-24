import { useNavigate } from "react-router-dom";

import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SelectionField from "./SelectionField";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

import { useFeedbacks } from "../../contexts/FeedbacksContext";
import { useNewFeedback } from "../../contexts/NewFeedbackContext";

export function FeedbackAdd() {
  const { handleSubmit, dispatch } = useNewFeedback();

  const { isLoading } = useFeedbacks();

  const navigate = useNavigate();

  function handleReturnBack() {
    dispatch({ type: "reset" });

    navigate("/");
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container max-w-2xl md:p-0 p-8">
      <button onClick={handleReturnBack} className="flex items-center group">
        <span>
          <i className="text-blue-default  text-xs mr-4 fa-solid fa-chevron-left"></i>
        </span>
        <span className="mt-1 font-bold text-gray-600 transition duration-300 group-hover:underline">
          Go Back
        </span>
      </button>

      <div className="relative bg-white px-8 py-16 mt-20 rounded-xl shadow-sm">
        <h1 className="text-3xl">Create New Feedback</h1>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <InputField />

          <SelectionField />

          <TextAreaField />

          <div className="flex gap-4 justify-end mt-12">
            <button
              onClick={handleReturnBack}
              className="btn bg-grey-darkest hover:bg-grey-darker-hover"
            >
              Cancel
            </button>
            <button className="btn bg-purple-default hover:bg-purple-hover">
              Add Feedback
            </button>
          </div>
        </form>

        <div className="absolute -top-8 left-6 bg-customGradient w-16 h-16 rounded-full">
          <i className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-2xl text-white fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
}
