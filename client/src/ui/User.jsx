import { useState } from "react";

import ParsedText from "./ParsedText";
import { ReplyPost } from "../features/reply/ReplyPost";

export function User({ user, commentId }) {
  const [reply, setReply] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleReply() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="flex items-center  gap-6 last:mb-8">
        <div className="h-14 w-14 flex-shrink-0 self-start">
          <img className="rounded-full" src={user.userImg} alt="user" />
        </div>
        <div className="w-full">
          <header className="flex justify-between">
            <div>
              <h3 className="text-lg">{user.fullName}</h3>
              <p className="text-gray-600">@{user.username}</p>
            </div>
            <button
              onClick={handleReply}
              className="font-bold text-blue-default duration-300 hover:underline"
            >
              Reply
            </button>
          </header>
          <p className="mt-6 text-grey-darkest">
            <span className="font-bold text-purple-default "></span>
            {ParsedText(user.comment, "text-purple-default")}
          </p>
        </div>
      </div>

      {isOpen && (
        <ReplyPost
          username={user.username}
          reply={reply}
          setReply={setReply}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
