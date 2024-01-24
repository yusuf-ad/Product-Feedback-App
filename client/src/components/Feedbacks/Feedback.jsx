import { Link } from "react-router-dom";

import { useFeedbacks } from "../../contexts/FeedbacksContext";

export function Feedback({ feedback }) {
  const { upvoteFeedback } = useFeedbacks();

  return (
    <div className="bg-white p-6 rounded-xl mt-8 flex gap-8 items-center shadow-sm ">
      <div
        onClick={() => upvoteFeedback(feedback._id)}
        className={`rounded-xl  transition-colors duration-200 cursor-pointer ${
          feedback.upvoted
            ? "bg-blue-default text-white"
            : "bg-grey-light hover:bg-grey-hover"
        }`}
      >
        <p className={`flex flex-col items-center px-3 py-2 font-bold`}>
          <span>
            <i
              className={`text-blue-default text-sm fa-solid fa-chevron-up ${
                feedback.upvoted ? "text-white" : ""
              }`}
            ></i>
          </span>
          {feedback.totalUpvotes}
        </p>
      </div>
      <Link className="w-full" to={`/feedback/detail/${feedback._id}`}>
        <div className="cursor-pointer group flex-grow transition-colors duration-300">
          <h4 className="text-xl mb-1 group-hover:text-blue-default">
            {feedback.title}
          </h4>
          <p className="text-gray-600">{feedback.details}</p>
          <p className="bg-grey-light mt-3  text-blue-default font-bold inline-block px-4 py-2 rounded-xl">
            {feedback.category}
          </p>
        </div>
      </Link>
      <p
        className={`ml-auto font-bold flex ${
          feedback.totalComments ? "" : "opacity-50"
        }`}
      >
        <span>
          <i className="text-gray-400 mr-2 fa-regular fa-comment"></i>
        </span>
        {feedback.totalComments}
      </p>
    </div>
  );
}
