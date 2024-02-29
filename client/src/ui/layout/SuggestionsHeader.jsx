import { Link } from "react-router-dom";
import SortButton from "../SortButton";
import { useFeedbacks } from "../../contexts/FeedbacksContext";

function SuggestionsHeader() {
  const { suggestionFeedbacks } = useFeedbacks();

  return (
    <header className="flex flex-col gap-8 rounded-xl bg-grey-darker px-4 py-4 md:flex-row md:px-6  md:py-4  ">
      <div className="flex justify-between md:flex md:justify-normal  md:gap-4 ">
        <div className="flex items-center gap-4">
          <img
            className="hidden sm:inline-block"
            src="./assets/suggestions/icon-suggestions.svg"
            alt="bulb"
          />
          <p className="font-bold text-white  md:mt-1">
            {suggestionFeedbacks.length} Suggestions
          </p>
        </div>

        <SortButton />
      </div>

      <Link to="/feedback/add" className="self-center md:ml-auto">
        <button className="btn  bg-purple-default   hover:bg-purple-hover">
          <i className="fa-solid  fa-plus text-xs"></i>
          <span className="ml-2">Add Feedback</span>
        </button>
      </Link>
    </header>
  );
}

export default SuggestionsHeader;
