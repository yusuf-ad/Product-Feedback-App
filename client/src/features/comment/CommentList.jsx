import { useEffect } from "react";
import { useComments } from "../../contexts/CommentsContext";
import Comment from "./Comment";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import { useReplies } from "../../contexts/RepliesContext";

export function CommentList({ feedbackId }) {
  const { comments, getComments, commentsLoading } = useComments();
  const { isLoading: isReplyLoading } = useReplies();

  useEffect(() => {
    getComments(feedbackId);
  }, [feedbackId, getComments]);

  return (
    <section>
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl">{comments.length} Comments</h2>

        {comments.map((comment) => (
          <Comment
            key={comment._id}
            commentId={comment._id}
            comment={comment}
          />
        ))}

        {(commentsLoading || isReplyLoading) && (
          <div className="flex items-center justify-center min-h-[10rem]">
            <LoadingSpinner type={"medium"} />
          </div>
        )}
      </div>
    </section>
  );
}
