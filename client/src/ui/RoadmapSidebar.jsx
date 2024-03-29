import { Link } from "react-router-dom";
import { useFeedbacks } from "../contexts/FeedbacksContext";

function RoadmapSidebar() {
  const { plannedFeedbacks, progressFeedbacks, liveFeedbacks } = useFeedbacks();

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center  justify-between">
        <h3 className="">Roadmap</h3>
        <Link
          className="font-bold text-blue-default underline decoration-1 hover:text-blue-hover "
          to={"/roadmap"}
        >
          View
        </Link>
      </div>

      <ul className="mt-6 space-y-1 ">
        <li className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-orange"></div>
          <p>Planned</p>
          <span className="ml-auto font-bold">{plannedFeedbacks.length}</span>
        </li>
        <li className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-purple-default"></div>
          <p>In-Progress</p>
          <span className="ml-auto font-bold">{progressFeedbacks.length}</span>
        </li>
        <li className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-blue-light"></div>
          <p>Live</p>
          <span className="ml-auto font-bold">{liveFeedbacks.length}</span>
        </li>
      </ul>
    </div>
  );
}

export default RoadmapSidebar;
