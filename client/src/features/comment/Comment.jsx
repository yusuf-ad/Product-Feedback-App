import { User } from "../../ui/User";
import { useReplies } from "../../contexts/RepliesContext";
import { useEffect, useState } from "react";

function Comment({ comment, commentId }) {
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
    <div className="mt-8 flex flex-col gap-4 border-b pb-0 pt-2 last:border-0 last:pb-4  ">
      <User user={comment} commentId={comment._id} />

      <ReplyList
        commentId={comment._id}
        replies={replies}
        setReplies={setReplies}
      />
    </div>
  );
}

export default Comment;

function ReplyList({ commentId, replies, setReplies }) {
  return (
    <div className="relative mt-6 flex w-full flex-col gap-8 self-end pl-12">
      <div className="absolute -top-14 left-6  h-[100%] w-[1px] bg-gray-300/80"></div>
      {replies.map((userReply) => (
        <User
          key={userReply._id}
          user={userReply}
          commentId={commentId}
          replies={replies}
          setReplies={setReplies}
        />
      ))}
    </div>
  );
}
