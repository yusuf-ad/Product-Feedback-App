import { useNavigate, useParams } from "react-router-dom";

import Feedback from "./Feedback";

import { useFeedbacks } from "../../contexts/FeedbacksContext";
import { useEffect, useRef } from "react";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import { useComments } from "../../contexts/CommentsContext";
import Comment from "../comment/Comment";

import { Link } from "react-router-dom";

import Error from "../../ui/Error";

function FeedbackDetails() {
  const navigate = useNavigate();
  const { id: feedbackId } = useParams();
  const { isLoading, currentFeedback, handleGetFeedback } = useFeedbacks();
  const {
    newComment,
    setNewComment,
    createComment,
    commentsLoading,
    getComments,
    comments,
    error,
    setError,
  } = useComments();

  const textArea = useRef(null);

  useEffect(() => {
    handleGetFeedback(feedbackId);
    getComments(feedbackId);
  }, [feedbackId, handleGetFeedback, getComments, comments.length]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!newComment.trim()) {
      textArea.current.focus();
      return setError("This can't be empty");
    }

    createComment(feedbackId);
    setNewComment("");
  }

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
        {commentsLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl">{comments.length} Comments</h2>

            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl">Add Comment</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            ref={textArea}
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);

              if (e.target.value.trim()) setError("");
            }}
            className={`mt-5 h-36 w-full resize-none rounded-md bg-grey-light px-6 py-4 shadow-sm ${
              error
                ? "text-red-default outline-red-default/70"
                : "outline-purple-default/50"
            }`}
            name="feedback-detail"
            id="detail"
            maxLength={255}
          ></textarea>

          {error && <Error message={error} />}

          <div className="mt-10 flex items-center justify-between">
            <p>{255 - newComment.trim().length} characters left</p>

            <button className="btn bg-purple-default hover:bg-purple-hover">
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackDetails;
