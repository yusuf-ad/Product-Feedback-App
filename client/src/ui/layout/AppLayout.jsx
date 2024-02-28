import RoadmapSidebar from "../RoadmapSidebar";
import FeedbackBoard from "../FeedbackBoard";
import SuggestionsHeader from "../layout/SuggestionsHeader";
import FeedbackCategories from "../../features/feedback/FeedbackCategories";
import FeedbacksList from "../../features/feedback/FeedbacksList";
import NoContent from "../NoContent";
import Aside from "./Aside";
import Main from "./Main";
import Section from "./Section";

function AppLayout() {
  return (
    <div className="container grid grid-cols-4 gap-12 p-10 md:p-8 lg:p-0 ">
      <Aside>
        <FeedbackBoard />
        <FeedbackCategories />
        <RoadmapSidebar />
      </Aside>
      <Main>
        <SuggestionsHeader />
        <Section>
          <FeedbacksList />

          <NoContent />
        </Section>
      </Main>
    </div>
  );
}

export default AppLayout;
