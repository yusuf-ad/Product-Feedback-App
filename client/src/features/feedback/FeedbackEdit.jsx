import { useNavigate, useParams } from "react-router-dom";

import EditFeedbackForm from "./EditFeedbackForm";

function FeedbackEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleReturnBack() {
    navigate(`/feedback/detail/${id}`);
  }

  return (
    <div className="container max-w-2xl p-10 md:p-8 lg:p-0">
      <button onClick={handleReturnBack} className="group flex items-center">
        <span>
          <i className="fa-solid  fa-chevron-left mr-4 text-xs text-blue-default"></i>
        </span>
        <span className="mt-1 font-bold text-gray-600 transition duration-300 group-hover:underline">
          Go Back
        </span>
      </button>

      <div className="relative mt-20 rounded-xl bg-white px-8 py-16 shadow-sm">
        <h1 className="text-3xl">
          Editing &apos;Q&A within the challenge hubs&apos;
        </h1>

        <EditFeedbackForm handleReturnBack={handleReturnBack} />

        <div className="absolute -top-8 left-6 h-16 w-16 rounded-full bg-customGradient">
          <i className="fa-solid fa-plus absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 text-2xl text-white"></i>
        </div>
      </div>
    </div>
  );
}

export default FeedbackEdit;
