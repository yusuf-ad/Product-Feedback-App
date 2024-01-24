import { RoadmapSidebar } from "../UI/RoadmapSidebar";
import { SuggestionsHeader } from "./SuggestionsHeader";
import { FeedbackBoard } from "../UI/FeedbackBoard";
import { FeedbackCategories } from "../UI/FeedbackCategories";
import Aside from "../Layout/Aside";
import Main from "../Layout/Main";
import Section from "../Layout/Section";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { useFeedbacks } from "../../contexts/FeedbacksContext";
import NoFeedback from "../UI/NoFeedback";
import FeedbacksList from "../Feedbacks/FeedbacksList";

function AppLayout() {
  const { sortedFeedbacks, isLoading } = useFeedbacks();

  return (
    <div className="container grid grid-cols-4 gap-12 md:p-0 p-8">
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
