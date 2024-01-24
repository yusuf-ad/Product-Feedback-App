import { useFeedbacks } from "../../contexts/FeedbacksContext";
import { Feedback } from "./Feedback";

function FeedbacksList() {
  const { sortedFeedbacks: feedbacks } = useFeedbacks();

  return (
    <div>
      {feedbacks.map((feedback) => (
        <Feedback key={feedback._id} feedback={feedback} />
      ))}
    </div>
  );
}

export default FeedbacksList;
