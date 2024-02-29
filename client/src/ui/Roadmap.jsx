import { Link, useNavigate } from "react-router-dom";
import { useFeedbacks } from "../contexts/FeedbacksContext";
import { FeatureCardList } from "../features/feature/FeatureCardList";
import { useEffect } from "react";

function Roadmap() {
  const {
    progressFeedbacks,
    plannedFeedbacks,
    liveFeedbacks,
    feedbacks,
    getAllFeedbacks,
  } = useFeedbacks();

  const navigate = useNavigate();

  useEffect(() => {
    if (feedbacks.length === 0) getAllFeedbacks();
  }, [getAllFeedbacks, feedbacks.length]);

  return (
    <div className="container p-4 py-6 md:p-6 lg:p-0">
      <header className="flex flex-col sm:flex-row sm:items-center gap-8 rounded-xl bg-grey-darkest px-8 py-6  ">
        <div>
          <button
            onClick={() => navigate("/")}
            className="group flex items-center text-white"
          >
            <span>
              <i className=" fa-solid fa-chevron-left mr-4 mt-[6px]  text-sm font-extrabold text-grey-75"></i>
            </span>
            <span className="mt-1 text-lg font-extrabold   transition duration-300 group-hover:underline">
              Go Back
            </span>
          </button>

          <h1 className="mt-4 text-3xl font-extrabold text-white">Roadmap</h1>
        </div>

        <Link to="/feedback/add" className="ml-auto  w-full sm:w-auto">
          <button className="btn  bg-purple-default hover:bg-purple-hover w-full">
            <i className="fa-solid fa-plus text-xs"></i>
            <span className="ml-2">Add Feedback</span>
          </button>
        </Link>
      </header>

      <main className="p-8 md:p-0 mt-4 md:mt-14 space-y-12 lg:space-y-0 lg:flex lg:gap-14">
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
