import FeatureCard from "./FeatureCard";

export function FeatureCardList({ features, color }) {
  return (
    <ul className="mt-8 space-y-6">
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} color={color} />
      ))}
    </ul>
  );
}
