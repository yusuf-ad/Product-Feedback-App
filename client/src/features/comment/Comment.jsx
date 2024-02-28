import { User } from "../../ui/User";
import { useReplies } from "../../contexts/RepliesContext";
import { useEffect, useState } from "react";
import { ReplyList } from "../reply/ReplyList";

function Comment({ comment }) {
  const { _id: commentId } = comment;

  const [replies, setReplies] = useState([]);
  const { getReplies } = useReplies();

  useEffect(() => {
    async function fetchData() {
      const replies = await getReplies(commentId);

      setReplies(replies);
    }

    fetchData();
  }, [commentId, getReplies]);

  return (
    <div className="mt-8 flex flex-col gap-4 border-b pb-0 pt-2 last:border-0 last:pb-4">
      <User
        user={comment}
        commentId={commentId}
        replies={replies}
        setReplies={setReplies}
      />

      <ReplyList
        commentId={commentId}
        replies={replies}
        setReplies={setReplies}
        render={(userReply) => (
          <User
            key={userReply._id}
            user={userReply}
            commentId={commentId}
            replies={replies}
            setReplies={setReplies}
          />
        )}
      />
    </div>
  );
}

export default Comment;
