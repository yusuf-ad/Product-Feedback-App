import { Link } from "react-router-dom";
import SortButton from "../UI/SortButton";

export function SuggestionsHeader({ numFeedbacks }) {
  return (
    <header className="md:px-6 md:py-4 px-4 py-4 bg-grey-darker rounded-xl flex md:flex-row flex-col  gap-8  ">
      <div className="md:flex md:justify-normal md:gap-4 flex  justify-between ">
        <div className="flex items-center gap-4">
          <img
            className="sm:inline-block hidden"
            src="./assets/suggestions/icon-suggestions.svg"
            alt="bulb"
          />
          <p className="font-bold md:mt-1  text-white">
            {numFeedbacks} Suggestions
          </p>
        </div>
        <SortButton />
      </div>

      <Link to="/feedback/add" className="md:ml-auto self-center">
        <button className="btn  bg-purple-default   hover:bg-purple-hover">
          <i className="text-xs  fa-solid fa-plus"></i>
          <span className="ml-2">Add Feedback</span>
        </button>
      </Link>
    </header>
  );
}
