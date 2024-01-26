import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./ui/layout/AppLayout";

import { FeedbacksProvider } from "./contexts/FeedbacksContext";
import { NewFeedbackProvider } from "./contexts/NewFeedbackContext";
import { CommentsProvider } from "./contexts/CommentsContext";

import FeedbackAdd from "./features/feedback/FeedbackAdd";
import FeedbackEdit from "./features/feedback/FeedbackEdit";
import FeedbackDetails from "./features/feedback/FeedbackDetails";

import PageNotFound from "./ui/PageNotFound";
import Roadmap from "./ui/Roadmap";

function App() {
  return (
    <FeedbacksProvider>
      <NewFeedbackProvider>
        <CommentsProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<AppLayout />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/feedback/add" element={<FeedbackAdd />} />
              <Route
                path="/feedback/detail/:id"
                element={<FeedbackDetails />}
              />
              <Route path="/feedback/edit/:id" element={<FeedbackEdit />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </CommentsProvider>
      </NewFeedbackProvider>
    </FeedbacksProvider>
  );
}

export default App;
