export function filterFeedbacks(feedbacks, status) {
  return feedbacks.filter((fb) => fb.status?.toLowerCase() === status);
}
