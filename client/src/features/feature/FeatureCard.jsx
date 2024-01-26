import { Link } from "react-router-dom";
import { useFeedbacks } from "../../contexts/FeedbacksContext";

function FeatureCard({ feature, color }) {
  const { upvoteFeedback } = useFeedbacks();

  function handleUpvote(id) {
    upvoteFeedback(id);
  }

  return (
    <li
      className={`border-t-8 border-t-${color} rounded-md bg-white px-8 py-10 `}
    >
      <p className="flex items-center text-lg text-grey-dark">
        <span className={`mr-4 block h-3 w-3 rounded-full bg-${color} `}></span>
        {feature.status}
      </p>

      <Link to={`/feedback/detail/${feature._id}`}>
        <div className="group cursor-pointer">
          <h3 className="mt-3 text-xl duration-200 group-hover:text-blue-default">
            {feature.title}
          </h3>
          <p className="my-3 text-grey-darker ">{feature.details}</p>
          <p className="mt-3 inline-block  rounded-xl bg-grey-light px-4 py-2 font-bold text-blue-default">
            {feature.category}
          </p>
        </div>
      </Link>

      <div className="mt-5 flex items-center">
        <div
          onClick={() => handleUpvote(feature._id)}
          className={`cursor-pointer rounded-xl transition-colors duration-200 ${
            feature.upvoted
              ? "bg-blue-default text-white hover:opacity-70"
              : "bg-grey-light hover:bg-grey-hover"
          }`}
        >
          <p className={`flex items-center gap-4 px-3 py-2 font-bold`}>
            <span>
              <i
                className={`fa-solid fa-chevron-up font-bold text-blue-default ${
                  feature.upvoted ? "text-white" : ""
                }`}
              ></i>
            </span>
            {feature.totalUpvotes}
          </p>
        </div>

        <p className={`ml-auto flex font-bold`}>
          <span>
            <i className="fa-regular fa-comment mr-2 text-gray-400"></i>
          </span>
          {feature.totalComments}
        </p>
      </div>
    </li>
  );
}

export default FeatureCard;
