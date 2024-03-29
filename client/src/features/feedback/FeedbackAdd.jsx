import { useNavigate } from "react-router-dom";
import PlusIcon from "../../ui/PlusIcon";
import CreateFeedbackForm from "./CreateFeedbackForm";

function FeedbackAdd() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-2xl p-10 md:p-8 lg:p-0">
      <button onClick={() => navigate("/")} className="group flex items-center">
        <span>
          <i className="fa-solid  fa-chevron-left mr-4 text-xs text-blue-default"></i>
        </span>
        <span className="mt-1 font-bold text-gray-600 transition duration-300 group-hover:underline">
          Go Back
        </span>
      </button>

      <div className="relative mt-20 rounded-xl bg-white px-8 py-16 shadow-sm">
        <h1 className="text-3xl">Create New Feedback</h1>

        <CreateFeedbackForm />

        <PlusIcon />
      </div>
    </div>
  );
}

export default FeedbackAdd;
