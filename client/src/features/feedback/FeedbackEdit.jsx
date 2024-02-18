import InputField from "./InputField";
import SelectionField from "./SelectionField";
import TextAreaField from "./TextAreaField";

import { useEffect } from "react";
import { useFeedbacks } from "../../contexts/FeedbacksContext";
import { useNavigate, useParams } from "react-router-dom";

import BASE_URL from "../../utils/BASE_URL";

function FeedbackEdit() {
  const {
    currentFeedback: feedback,
    handleGetFeedback,
    setIsLoading,
    feedbacks,
    setFeedbacks,
  } = useFeedbacks();

  const { title, category, details, status } = feedback;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetFeedback(id);
  }, [handleGetFeedback, id]);

  // useEffect(() => {
  //   titleInput.current.value = `${feedback.title}`;
  //   detailsInput.current.value = `${feedback.details}`;
  // });

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
    <div className="container max-w-2xl  p-12 md:p-0">
      <button onClick={handleReturnBack} className="group flex items-center">
        <span>
          <i className="fa-solid  fa-chevron-left mr-4 text-xs text-blue-default"></i>
        </span>
        <span className="mt-1 font-bold text-gray-600 transition duration-300 group-hover:underline">
          Go Back
        </span>
      </button>

      <div className="relative mt-20 rounded-xl bg-white px-8 py-16 shadow-sm">
        <h1 className="text-3xl">
          Editing &apos;Q&A within the challenge hubs&apos;
        </h1>

        <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-8">
          <InputField currentTitle={title} />

          <SelectionField selected={feedback.category} />

          <SelectionField
            select="Update Status"
            selectMsg="Change feature state"
            menuItems={["Suggestion", "Planned", "In-Progress", "Live"]}
            selected={feedback.status}
            action="changeStatus"
          />

          <TextAreaField />

          <div className="mt-6 flex gap-4">
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

        <div className="absolute -top-8 left-6 h-16 w-16 rounded-full bg-customGradient">
          <i className="fa-solid fa-plus absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 text-2xl text-white"></i>
        </div>
      </div>
    </div>
  );
}

export default FeedbackEdit;
