import SelectionField from "../components/Feedbacks/SelectionField";
import InputField from "../components/Feedbacks/InputField";
import TextAreaField from "../components/Feedbacks/TextAreaField";
import { useEffect } from "react";
import { useFeedbacks } from "../contexts/FeedbacksContext";
import { useNewFeedback } from "../contexts/NewFeedbackContext";
import { useNavigate, useParams } from "react-router-dom";

import BASE_URL from "../utils/BASE_URL";

function FeedbackEdit() {
  const { titleInput, detailsInput } = useNewFeedback();
  const {
    currentFeedback: feedback,
    handleGetFeedback,
    setIsLoading,
    feedbacks,
    setFeedbacks,
  } = useFeedbacks();

  const { details, title, category, status } = useNewFeedback();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetFeedback(id);
  }, [handleGetFeedback, id]);

  useEffect(() => {
    titleInput.current.value = `${feedback.title}`;
    detailsInput.current.value = `${feedback.details}`;
  });

  const handleUpdateFeedback = async function (id) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/feedbacks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title ? title : feedback.title,
          category: category,
          status: status,
          details: details ? details : feedback.details,
        }),
      });
      const { data } = await res.json();

      console.log(data);

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

  function handleReturnBack() {
    navigate(`/feedback/detail/${id}`);
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateFeedback(id);

    handleReturnBack();
  }

  function handleDelete() {
    handleDeleteFeedback(id);

    navigate("/");
  }

  return (
    <div className="container max-w-2xl  md:p-0 p-12">
      <button onClick={handleReturnBack} className="flex items-center group">
        <span>
          <i className="text-blue-default  text-xs mr-4 fa-solid fa-chevron-left"></i>
        </span>
        <span className="mt-1 font-bold text-gray-600 transition duration-300 group-hover:underline">
          Go Back
        </span>
      </button>

      <div className="relative bg-white px-8 py-16 mt-20 rounded-xl shadow-sm">
        <h1 className="text-3xl">Editing 'Q&A within the challenge hubs'</h1>

        <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-8">
          <InputField />

          <SelectionField selected={feedback.category} />

          <SelectionField
            select="Update Status"
            selectMsg="Change feature state"
            menuItems={["Suggestion", "Planned", "In-Progress", "Live"]}
            selected={feedback.status}
            action="changeStatus"
          />

          <TextAreaField />

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleDelete}
              className="btn bg-red-default hover:bg-red-hover"
            >
              Delete
            </button>
            <button
              onClick={handleReturnBack}
              className="btn ml-auto bg-grey-darkest hover:bg-grey-darker-hover"
            >
              Cancel
            </button>
            <button className="btn bg-purple-default hover:bg-purple-hover">
              Add Feedback
            </button>
          </div>
        </form>

        <div className="absolute -top-8 left-6 bg-customGradient w-16 h-16 rounded-full">
          <i className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-2xl text-white fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
}

export default FeedbackEdit;
