import RoadmapSidebar from "../RoadmapSidebar";
import FeedbackBoard from "../FeedbackBoard";
import SuggestionsHeader from "../layout/SuggestionsHeader";
import FeedbackCategories from "../../features/feedback/FeedbackCategories";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import NoFeedback from "../NoFeedback";
import FeedbacksList from "../../features/feedback/FeedbacksList";

import Aside from "./Aside";
import Main from "./Main";
import Section from "./Section";
import { useFeedbacks } from "../../contexts/FeedbacksContext";

function AppLayout() {
  const { sortedFeedbacks, isLoading } = useFeedbacks();

  return (
    <div className="container grid grid-cols-4 gap-12 p-8 md:p-0">
      <Aside>
        <FeedbackBoard />
        <FeedbackCategories />
        <RoadmapSidebar />
      </Aside>
      <Main>
        <SuggestionsHeader numFeedbacks={sortedFeedbacks.length} />
        <Section>
          {isLoading ? <LoadingSpinner /> : <FeedbacksList />}

          {!sortedFeedbacks.length && !isLoading && <NoFeedback />}
        </Section>
      </Main>
    </div>
  );
}

export default AppLayout;
