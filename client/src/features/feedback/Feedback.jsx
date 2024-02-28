import { Link } from "react-router-dom";

import { useFeedbacks } from "../../contexts/FeedbacksContext";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

function Feedback({ feedback }) {
  const { upvoteFeedback, isLoading } = useFeedbacks();

  if (isLoading)
    return (
      <div className="bg-white flex items-center justify-center min-h-[10rem] rounded-xl mt-8">
        <LoadingSpinner type={"medium"} />
      </div>
    );

  return (
    <div className="mt-8 flex items-center gap-8 rounded-xl bg-white p-6 shadow-sm ">
      <div
        onClick={() => upvoteFeedback(feedback._id)}
        className={`cursor-pointer  rounded-xl transition-colors duration-200 ${
          feedback.upvoted
            ? "bg-blue-default text-white"
            : "bg-grey-light hover:bg-grey-hover"
        }`}
      >
        <p className={`flex flex-col items-center px-3 py-2 font-bold`}>
          <span>
            <i
              className={`fa-solid fa-chevron-up text-sm text-blue-default ${
                feedback.upvoted ? "text-white" : ""
              }`}
            ></i>
          </span>
          {feedback.totalUpvotes}
        </p>
      </div>
      <Link className="w-full" to={`/feedback/detail/${feedback._id}`}>
        <div className="group flex-grow cursor-pointer transition-colors duration-300">
          <h4 className="mb-1 text-xl group-hover:text-blue-default">
            {feedback.title}
          </h4>
          <p className="text-gray-600">{feedback.details}</p>
          <p className="mt-3 inline-block  rounded-xl bg-grey-light px-4 py-2 font-bold text-blue-default capitalize">
            {feedback.category}
          </p>
        </div>
      </Link>
      <p
        className={`ml-auto flex font-bold ${
          feedback.totalComments ? "" : "opacity-50"
        }`}
      >
        <span>
          <i className="fa-regular fa-comment mr-2 text-gray-400"></i>
        </span>
        {feedback.totalComments}
      </p>
    </div>
  );
}

export default Feedback;
