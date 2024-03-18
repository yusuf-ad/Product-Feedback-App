import { createContext, useCallback, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BASE_URL from "../utils/BASE_URL";

import { filterFeedbacks } from "../utils/filterFeedbacks";

// 1) create context
const FeedbacksContext = createContext({
  currentFeedback: null,
  setCurrentFeedback: () => {},
  feedbacks: [],
  setFeedbacks: () => {},
  activeFilter: "",
  setActiveFilter: () => {},
  sortBy: "",
  setSortBy: () => {},
  sortedFeedbacks: [],
  handleAddFeedback: () => {},
  handleGetFeedback: () => {},
  upvoteFeedback: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

// 2) create provider
function FeedbacksProvider({ children }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  let suggestionFeedbacks = filterFeedbacks(feedbacks, "suggestion");
  const plannedFeedbacks = filterFeedbacks(feedbacks, "planned");
  const progressFeedbacks = filterFeedbacks(feedbacks, "in-progress");
  const liveFeedbacks = filterFeedbacks(feedbacks, "live");

  // filter category
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  if (activeCategory !== "all") {
    suggestionFeedbacks = suggestionFeedbacks.filter(
      (fb) => fb.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  // sort category
  const activeSort = searchParams.get("sortBy") || "most upvotes";

  const [order, field] = activeSort.split(" ");

  const modifier = order === "least" ? 1 : -1;

  suggestionFeedbacks = suggestionFeedbacks.sort((a, b) => {
    if (field === "upvotes") {
      return (a.totalUpvotes - b.totalUpvotes) * modifier;
    }

    return (a.totalComments - b.totalComments) * modifier;
  });

  const getAllFeedbacks = useCallback(async function () {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/feedbacks`);
      const { data } = await res.json();

      setFeedbacks(data.feedbacks);
    } catch (err) {
      console.log("ERR 🔥", err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetFeedback = useCallback(async function (id) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/feedbacks/${id}`);
      const { data } = await res.json();

      setCurrentFeedback(data.feedback);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function handleAddFeedback(feedback) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/feedbacks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });
      const { data } = await res.json();

      setFeedbacks((feedbacks) => [...feedbacks, data.feedback]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdateFeedback = async function (id, newFeedback) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/feedbacks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });
      const { data } = await res.json();

      const filteredFeedbacks = feedbacks.filter(
        (item) => item._id !== data._id
      );

      setFeedbacks([...filteredFeedbacks, data]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleDeleteFeedback(id) {
    setIsLoading(true);
    try {
      await fetch(`${BASE_URL}/feedbacks/${id}`, {
        method: "DELETE",
      });

      setFeedbacks((feedbacks) => feedbacks.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const upvoteFeedback = async function (id) {
    try {
      const res = await fetch(`${BASE_URL}/feedbacks/${id}`, {
        method: "PATCH",
      });
      const { data } = await res.json();

      setFeedbacks((feedbacks) =>
        feedbacks.map((feedback) =>
          feedback._id === data.feedback._id
            ? {
                ...feedback,
                upvoted: data.feedback.upvoted,
                totalUpvotes: data.feedback.totalUpvotes,
              }
            : feedback
        )
      );

      if (data.feedback._id === currentFeedback._id) {
        currentFeedback.upvoted = data.feedback.upvoted;
        currentFeedback.totalUpvotes = data.feedback.totalUpvotes;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FeedbacksContext.Provider
      value={{
        currentFeedback,
        setCurrentFeedback,
        feedbacks,
        setFeedbacks,

        getAllFeedbacks,
        handleAddFeedback,
        handleGetFeedback,
        handleUpdateFeedback,
        handleDeleteFeedback,
        upvoteFeedback,
        isLoading,
        setIsLoading,

        suggestionFeedbacks,
        plannedFeedbacks,
        progressFeedbacks,
        liveFeedbacks,
      }}
    >
      {children}
    </FeedbacksContext.Provider>
  );
}

function useFeedbacks() {
  const value = useContext(FeedbacksContext);

  if (value === undefined)
    throw new Error(
      "FeedbacksContext was used outside of the FeedbacksContextProvider"
    );

  return value;
}

export { FeedbacksProvider, useFeedbacks };
