import { Link } from "react-router-dom";
import { useFeedbacks } from "../contexts/FeedbacksContext";

function NoContent() {
  const { suggestionFeedbacks, isLoading } = useFeedbacks();

  if (!suggestionFeedbacks.length && !isLoading)
    return (
      <div className="bg-white mt-8  rounded-md py-32 flex gap-6 flex-col items-center justify-center text-center shadow-sm">
        <img
          className="mb-8"
          src="./assets/suggestions/illustration-empty.svg"
          alt="Detective looking through magnifying glass indicating no feedback (icon)"
        />

        <h3>There is no feedback yet.</h3>
        <p className=" text-grey-darker text-lg">
          Got a suggestion? Found a bug that needs to be squashed? <br /> We
          love hearing about new ideas to improve our app.
        </p>

        <Link to="/feedback/add ">
          <button className="mt-8 btn bg-purple-default   hover:bg-purple-hover">
            <i className="text-xs  fa-solid fa-plus"></i>
            <span className="ml-2">Add Feedback</span>
          </button>
        </Link>
      </div>
    );
}

export default NoContent;
