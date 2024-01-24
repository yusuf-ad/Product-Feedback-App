import { Link } from "react-router-dom";
import { useFeedbacks } from "../../contexts/FeedbacksContext";

export function FeatureCard({ feature, color }) {
  const { upvoteFeedback } = useFeedbacks();

  function handleUpvote(id) {
    upvoteFeedback(id);
  }

  return (
    <li
      className={`border-t-8 border-t-${color} bg-white py-10 px-8 rounded-md `}
    >
      <p className="flex items-center text-grey-dark text-lg">
        <span className={`block mr-4 w-3 h-3 rounded-full bg-${color} `}></span>
        {feature.status}
      </p>

      <Link to={`/feedback/detail/${feature._id}`}>
        <div className="group cursor-pointer">
          <h3 className="text-xl mt-3 group-hover:text-blue-default duration-200">
            {feature.title}
          </h3>
          <p className="text-grey-darker my-3 ">{feature.details}</p>
          <p className="bg-grey-light mt-3  text-blue-default font-bold inline-block px-4 py-2 rounded-xl">
            {feature.category}
          </p>
        </div>
      </Link>

      <div className="mt-5 flex items-center">
        <div
          onClick={() => handleUpvote(feature._id)}
          className={`rounded-xl transition-colors duration-200 cursor-pointer ${
            feature.upvoted
              ? "bg-blue-default text-white hover:opacity-70"
              : "bg-grey-light hover:bg-grey-hover"
          }`}
        >
          <p className={`flex items-center gap-4 px-3 py-2 font-bold`}>
            <span>
              <i
                className={`text-blue-default font-bold fa-solid fa-chevron-up ${
                  feature.upvoted ? "text-white" : ""
                }`}
              ></i>
            </span>
            {feature.totalUpvotes}
          </p>
        </div>

        <p className={`ml-auto font-bold flex`}>
          <span>
            <i className="text-gray-400 mr-2 fa-regular fa-comment"></i>
          </span>
          {feature.totalComments}
        </p>
      </div>
    </li>
  );
}
