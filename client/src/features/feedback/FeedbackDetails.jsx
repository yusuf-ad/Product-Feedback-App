import { useNavigate, useParams } from "react-router-dom";
import { useFeedbacks } from "../../contexts/FeedbacksContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useComments } from "../../contexts/CommentsContext";
import { Link } from "react-router-dom";

import Feedback from "./Feedback";
import Comment from "../comment/Comment";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import FormRow from "../../ui/FormRow";
import TextAreaField from "../../ui/TextAreaField";

function FeedbackDetails() {
  const navigate = useNavigate();
  const { id: feedbackId } = useParams();
  const { isLoading, currentFeedback, handleGetFeedback } = useFeedbacks();

  const { createComment, commentsLoading, getComments, comments } =
    useComments();

  useEffect(() => {
    handleGetFeedback(feedbackId);
    getComments(feedbackId);
  }, [feedbackId, handleGetFeedback, getComments]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container max-w-4xl p-12 md:p-0 ">
      <header className="flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center"
        >
          <span>
            <i className="fa-solid  fa-chevron-left mr-4 text-xs text-blue-default"></i>
          </span>
          <span className="mt-1 font-bold text-gray-600 transition duration-300 group-hover:underline">
            Go Back
          </span>
        </button>

        <Link to={`/feedback/edit/${feedbackId}`}>
          <button className="btn bg-blue-default hover:bg-blue-hover">
            Edit Feedback
          </button>
        </Link>
      </header>

      <Feedback feedback={currentFeedback} />

      <section>
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl">{comments.length} Comments</h2>

          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>

        {/* {!commentsLoading && <LoadingSpinner />} */}
      </section>

      <CreateComment feedbackId={feedbackId} />
    </div>
  );
}

export default FeedbackDetails;

function CreateComment({ feedbackId }) {
  const { handleSubmit, register, watch } = useForm();
  const { createComment, commentsLoading } = useComments();

  function onSubmit(data) {
    const { newComment } = data;

    createComment(feedbackId, newComment);
  }

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl">Add Comment</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <div className="h-36 mt-6 mb-12">
            <TextAreaField name={"newComment"} register={register} />
          </div>
        </FormRow>

        <div className="mt-10 flex items-center justify-between">
          <p>{255 - watch("newComment")?.trim().length} characters left</p>

          <button className="btn bg-purple-default hover:bg-purple-hover">
            Post Comment
          </button>
        </div>
      </form>
    </section>
  );
}
