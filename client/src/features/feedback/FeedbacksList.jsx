import { useEffect } from "react";
import { useFeedbacks } from "../../contexts/FeedbacksContext";
import Feedback from "./Feedback";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

function FeedbacksList() {
  const { suggestionFeedbacks, getAllFeedbacks, isLoading } = useFeedbacks();

  useEffect(() => {
    getAllFeedbacks();
  }, [getAllFeedbacks]);

  if (isLoading)
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      {suggestionFeedbacks.map((feedback) => (
        <Feedback key={feedback._id} feedback={feedback} />
      ))}
    </div>
  );
}

export default FeedbacksList;
