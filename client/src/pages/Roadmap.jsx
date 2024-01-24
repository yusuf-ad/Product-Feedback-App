import { Link, useNavigate } from "react-router-dom";
import { useFeedbacks } from "../contexts/FeedbacksContext";
import { FeatureCardList } from "../components/UI/FeatureCardList";

function Roadmap() {
  const { progressFeedbacks, plannedFeedbacks, liveFeedbacks } = useFeedbacks();

  const navigate = useNavigate();

  return (
    <div className="container ">
      <header className="px-8 py-6 bg-grey-darkest rounded-xl flex items-center gap-8  ">
        <div>
          <button
            onClick={() => navigate("/")}
            className="text-white flex items-center group"
          >
            <span>
              <i className=" text-grey-75 text-sm mt-[6px] font-extrabold  mr-4 fa-solid fa-chevron-left"></i>
            </span>
            <span className="mt-1 font-extrabold text-lg   transition duration-300 group-hover:underline">
              Go Back
            </span>
          </button>

          <h1 className="font-extrabold text-white text-3xl mt-4">Roadmap</h1>
        </div>

        <Link to="/feedback/add" className="ml-auto">
          <button className="btn  bg-purple-default   hover:bg-purple-hover">
            <i className="text-xs  fa-solid fa-plus"></i>
            <span className="ml-2">Add Feedback</span>
          </button>
        </Link>
      </header>

      <main className="mt-14 md:flex md:space-y-0 md:p-0 space-y-8 p-8 gap-14">
        {/* status-1 */}
        <div className="flex-1">
          <header>
            <h2 className="text-2xl">Planned ({plannedFeedbacks.length})</h2>
            <p className="mt-2 text-lg text-grey-dark ">
              Ideas prioritized for research
            </p>
          </header>

          <FeatureCardList features={plannedFeedbacks} color="orange" />
        </div>
        {/* status-2 */}
        <div className="flex-1">
          <header>
            <h2 className="text-2xl">
              In-Progress ({progressFeedbacks.length})
            </h2>
            <p className="mt-2 text-lg text-grey-dark ">
              Ideas prioritized for research
            </p>
          </header>

          <FeatureCardList
            features={progressFeedbacks}
            color="purple-default"
          />
        </div>
        {/* status-3 */}
        <div className="flex-1">
          <header>
            <h2 className="text-2xl ">Live ({liveFeedbacks.length})</h2>
            <p className="mt-2 text-lg text-grey-dark ">
              Ideas prioritized for research
            </p>
          </header>

          <FeatureCardList features={liveFeedbacks} color="blue-light" />
        </div>
      </main>
    </div>
  );
}

export default Roadmap;
