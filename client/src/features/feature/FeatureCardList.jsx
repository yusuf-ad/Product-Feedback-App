import { useFeedbacks } from "../../contexts/FeedbacksContext";
import FeatureCard from "./FeatureCard";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

export function FeatureCardList({ features, color }) {
  const { isLoading } = useFeedbacks();

  if (isLoading)
    return (
      <div className="mt-8">
        <LoadingSpinner type={"medium"} />
      </div>
    );

  return (
    <ul className="mt-8 space-y-6">
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} color={color} />
      ))}
    </ul>
  );
}
