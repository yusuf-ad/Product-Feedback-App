import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import BASE_URL from "../utils/BASE_URL";
import { toCamelCase } from "../utils/toCamelCase";

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
  const [currentFeedback, setCurrentFeedback] = useState({});

  const [feedbacks, setFeedbacks] = useState([]);

  const plannedFeedbacks = feedbacks.filter((fb) => fb.status === "Planned");
  const progressFeedbacks = feedbacks.filter(
    (fb) => fb.status === "In-Progress"
  );
  const liveFeedbacks = feedbacks.filter((fb) => fb.status === "Live");

  const [sortedFeedbacks, setSortedFeedbacks] = useState([]);

  const [sortBy, setSortBy] = useState("Most upvotes");
  const [activeFilter, setActiveFilter] = useState("All");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ! The problem might be arising because Array.sort() mutates the original array in place,
    // ! causing unexpected behavior when you set the state based on the sorted array directly.

    let sorted;

    if (!sortedFeedbacks)
      sorted = [...feedbacks].filter((fb) => fb.status === "Suggestion");
    // Create a new array instance
    else
      sorted = [...sortedFeedbacks].filter((fb) => fb.status === "Suggestion");

    switch (toCamelCase(sortBy)) {
      case "mostUpvotes":
        sorted.sort((a, b) => b["totalUpvotes"] - a["totalUpvotes"]);
        setSortedFeedbacks([...sorted]);
        break;
      case "leastUpvotes":
        sorted.sort((a, b) => a["totalUpvotes"] - b["totalUpvotes"]);
        setSortedFeedbacks([...sorted]); // Set a new sorted array
        break;
      case "mostComments":
        sorted.sort((a, b) => b["totalComments"] - a["totalComments"]);
        setSortedFeedbacks([...sorted]); // Set a new sorted array
        break;
      case "leastComments":
        sorted.sort((a, b) => a["totalComments"] - b["totalComments"]);
        setSortedFeedbacks([...sorted]); // Set a new sorted array
        break;
      default:
        throw new Error("Error has occurred in sorting");
    }
  }, [sortBy, feedbacks]);

  useEffect(() => {
    let filtered = [...feedbacks].filter((fb) => fb.status === "Suggestion"); // Create a new array instance

    switch (activeFilter) {
      case "All":
        setSortedFeedbacks(filtered);
        break;

      default:
        filtered = filtered.filter((fb) => fb.category === activeFilter);
        setSortedFeedbacks([...filtered]);
    }
  }, [activeFilter, feedbacks]);

  useEffect(() => {
    async function getFeedbacks() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/feedbacks`);
        const { data } = await res.json();

        console.log(data);
        setFeedbacks(data.feedbacks);
      } catch (err) {
        console.log("ERR 🔥", err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getFeedbacks();
  }, [currentFeedback]);

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
        activeFilter,
        setActiveFilter,
        sortBy,
        setSortBy,
        sortedFeedbacks,
        setFeedbacks,
        handleAddFeedback,
        handleGetFeedback,
        handleUpdateFeedback,
        handleDeleteFeedback,
        upvoteFeedback,
        isLoading,
        setIsLoading,

        progressFeedbacks,
        liveFeedbacks,
        plannedFeedbacks,
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
