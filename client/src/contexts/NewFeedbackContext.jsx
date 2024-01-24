import { createContext, useContext, useReducer, useRef } from "react";
import { useFeedbacks } from "./FeedbacksContext";

const NewFeedbackContext = createContext();

const initialState = {
  title: "",
  details: "",
  category: "Feature",
  status: "Suggestion",
  titleError: "",
  detailsError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "changeTitle":
      return { ...state, title: action.payload };

    case "changeDetails":
      return { ...state, details: action.payload };

    case "changeStatus":
      return { ...state, status: action.payload };

    case "changeCategory":
      return { ...state, category: action.payload };

    case "titleError":
      return { ...state, titleError: action.payload };

    case "detailsError":
      return { ...state, detailsError: action.payload };

    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action type");
  }
}

function NewFeedbackProvider({ children }) {
  const [
    { title, details, category, titleError, status, detailsError },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { handleAddFeedback } = useFeedbacks();

  const detailsInput = useRef(null);
  const titleInput = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      titleInput.current.focus();
      return dispatch({ type: "titleError", payload: "Can't be empty." });
    }

    if (!details.trim()) {
      detailsInput.current.focus();
      return dispatch({ type: "detailsError", payload: "Can't be empty." });
    }

    const newFeedback = {
      title: title.trim(),
      details: details.trim(),
      category,
    };

    await handleAddFeedback(newFeedback);

    dispatch({ type: "reset" });

    // useNavigate() may be used only in the context of a <Router> component.
    window.location.href = "/";
  }

  return (
    <NewFeedbackContext.Provider
      value={{
        title,
        details,
        category,
        status,
        titleError,
        detailsError,
        dispatch,
        handleSubmit,
        titleInput,
        detailsInput,
      }}
    >
      {children}
    </NewFeedbackContext.Provider>
  );
}

function useNewFeedback() {
  const value = useContext(NewFeedbackContext);

  if (value === undefined)
    throw new Error(
      "NewFeedbackContext was used outside of the NewFeedbackContextProvider"
    );

  return value;
}

export { NewFeedbackProvider, useNewFeedback };
