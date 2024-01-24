import { useNavigate, useParams } from "react-router-dom";
import { Feedback } from "../components/Feedbacks/Feedback";
import { useFeedbacks } from "../contexts/FeedbacksContext";
import { useEffect, useRef } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
import { useComments } from "../contexts/CommentsContext";
import { Comment } from "../components/Comments/Comment";

import { Link } from "react-router-dom";

import Error from "../components/UI/Error";

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
    <div className="container max-w-4xl md:p-0 p-12 ">
      <header className="flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center group"
        >
          <span>
            <i className="text-blue-default  text-xs mr-4 fa-solid fa-chevron-left"></i>
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
          <div className="bg-white p-6 rounded-xl mt-8 shadow-sm">
            <h2 className="text-xl">{comments.length} Comments</h2>

            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </section>

      <div className="bg-white p-6 rounded-xl mt-8 shadow-sm">
        <h2 className="text-xl mb-4">Add Comment</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            ref={textArea}
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);

              if (e.target.value.trim()) setError("");
            }}
            className={`shadow-sm mt-5 bg-grey-light h-36 px-6 py-4 rounded-md w-full resize-none ${
              error
                ? "outline-red-default/70 text-red-default"
                : "outline-purple-default/50"
            }`}
            name="feedback-detail"
            id="detail"
            maxLength={255}
          ></textarea>

          {error && <Error message={error} />}

          <div className="flex justify-between items-center mt-10">
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
