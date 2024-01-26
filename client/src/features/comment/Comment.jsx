import { useEffect, useState } from "react";

import BASE_URL from "../../utils/BASE_URL";
import { User } from "../../ui/User";

function Comment({ comment }) {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    async function getReplies() {
      const res = await fetch(`${BASE_URL}/replies/${comment._id}`);
      const { data } = await res.json();

      console.log(data);
      setReplies(data.replies);
    }

    getReplies();
  }, [comment._id]);

  return (
    <div className="mt-8 flex flex-col gap-4 border-b pb-0 pt-2 last:border-0 last:pb-4  ">
      <User user={comment} commentId={comment._id} setReplies={setReplies} />

      <div className="relative mt-6 flex w-full flex-col gap-8 self-end pl-12">
        <div className="absolute -top-14 left-6  h-[100%] w-[1px] bg-gray-300/80"></div>
        {replies.map((userReply) => (
          <User
            key={userReply._id}
            user={userReply}
            commentId={comment._id}
            setReplies={setReplies}
          />
        ))}
      </div>
    </div>
  );
}

export default Comment;
