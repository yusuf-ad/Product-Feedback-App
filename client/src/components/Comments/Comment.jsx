import { useEffect, useState } from "react";

import BASE_URL from "../../utils/BASE_URL";
import { User } from "../UI/User";

export function Comment({ comment }) {
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
    <div className="mt-8 pb-0 last:pb-4 pt-2 border-b last:border-0 flex gap-4 flex-col  ">
      <User user={comment} commentId={comment._id} setReplies={setReplies} />

      <div className="relative w-full self-end mt-6 pl-12 flex flex-col gap-8   ">
        <div className="-top-14 left-6 h-[100%]  w-[1px] bg-gray-300/80 absolute"></div>
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
