import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/Layout/AppLayout";
import { FeedbackAdd } from "./components/Feedbacks/FeedbackAdd";

import { FeedbacksProvider } from "./contexts/FeedbacksContext";
import { NewFeedbackProvider } from "./contexts/NewFeedbackContext";
import { CommentsProvider } from "./contexts/CommentsContext";

import PageNotFound from "./pages/PageNotFound";
import FeedbackDetails from "./pages/FeedbackDetails";
import FeedbackEdit from "./pages/FeedbackEdit";
import Roadmap from "./pages/Roadmap";

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
