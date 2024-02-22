import { useEffect, useState } from "react";

import { User } from "../../ui/User";
import { useReplies } from "../../contexts/RepliesContext";

function Comment({ comment }) {
  const { replies, getReplies } = useReplies();

  console.log("replies", replies);

  return (
    <div className="mt-8 flex flex-col gap-4 border-b pb-0 pt-2 last:border-0 last:pb-4  ">
      <User user={comment} commentId={comment._id} />

      <div className="relative mt-6 flex w-full flex-col gap-8 self-end pl-12">
        <div className="absolute -top-14 left-6  h-[100%] w-[1px] bg-gray-300/80"></div>
        {replies.map((userReply) => (
          <User key={userReply._id} user={userReply} commentId={comment._id} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
