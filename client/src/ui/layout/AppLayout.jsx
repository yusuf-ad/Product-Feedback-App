import { useFeedbacks } from "../../contexts/FeedbacksContext";

import RoadmapSidebar from "../RoadmapSidebar";
import FeedbackBoard from "../FeedbackBoard";
import SuggestionsHeader from "../layout/SuggestionsHeader";
import FeedbackCategories from "../../features/feedback/FeedbackCategories";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import FeedbacksList from "../../features/feedback/FeedbacksList";
import NoContent from "../NoContent";
import Aside from "./Aside";
import Main from "./Main";
import Section from "./Section";

function AppLayout() {
  const { sortedFeedbacks, isLoading } = useFeedbacks();

  return (
    <div className="container grid grid-cols-4 gap-12 p-10 md:p-8 lg:p-0 ">
      <Aside>
        <FeedbackBoard />
        <FeedbackCategories />
        <RoadmapSidebar />
      </Aside>
      <Main>
        <SuggestionsHeader numFeedbacks={sortedFeedbacks.length} />
        <Section>
          {isLoading ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <LoadingSpinner />
            </div>
          ) : (
            <FeedbacksList />
          )}

          {!sortedFeedbacks.length && !isLoading && <NoContent />}
        </Section>
      </Main>
    </div>
  );
}

export default AppLayout;
