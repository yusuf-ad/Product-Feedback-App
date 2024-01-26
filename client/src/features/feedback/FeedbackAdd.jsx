import { useNavigate } from "react-router-dom";

import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SelectionField from "./SelectionField";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

import { useFeedbacks } from "../../contexts/FeedbacksContext";

import { useNewFeedback } from "../../contexts/NewFeedbackContext";

function FeedbackAdd() {
  const { handleSubmit, dispatch } = useNewFeedback();

  const { isLoading } = useFeedbacks();

  const navigate = useNavigate();

  function handleReturnBack() {
    dispatch({ type: "reset" });

    navigate("/");
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container max-w-2xl p-8 md:p-0">
      <button onClick={handleReturnBack} className="group flex items-center">
        <span>
          <i className="fa-solid  fa-chevron-left mr-4 text-xs text-blue-default"></i>
        </span>
        <span className="mt-1 font-bold text-gray-600 transition duration-300 group-hover:underline">
          Go Back
        </span>
      </button>

      <div className="relative mt-20 rounded-xl bg-white px-8 py-16 shadow-sm">
        <h1 className="text-3xl">Create New Feedback</h1>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <InputField />

          <SelectionField />

          <TextAreaField />

          <div className="mt-12 flex justify-end gap-4">
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

        <div className="absolute -top-8 left-6 h-16 w-16 rounded-full bg-customGradient">
          <i className="fa-solid fa-plus absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 text-2xl text-white"></i>
        </div>
      </div>
    </div>
  );
}

export default FeedbackAdd;
