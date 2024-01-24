import { useState } from "react";
import { faker } from "@faker-js/faker";
import BASE_URL from "../../utils/BASE_URL";
import { ReplyPost } from "./ReplyPost";

const parseText = (text, color) => {
  const parts = text.split(" ");
  return parts.map((part, index) => {
    if (part.startsWith("@")) {
      return (
        <span key={index} className={`${color} font-bold`}>
          {" "}
          {part}
        </span>
      );
    }
    return (
      <span key={index} style={{ color: "black" }}>
        {" "}
        {part}
      </span>
    );
  });
};

export function User({ user, commentId, setReplies }) {
  const [reply, setReply] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function createReply() {
    try {
      const res = await fetch(`${BASE_URL}/replies/${commentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: faker.person.fullName(),
          username: undefined,
          comment: reply,
          userImg: faker.image.avatar(),
        }),
      });
      const { data } = await res.json();

      setReplies((replies) => [...replies, data.reply]);
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleReply() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="flex items-center  gap-6 last:mb-8">
        <div className="w-14 h-14 flex-shrink-0 self-start">
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
              className="font-bold text-blue-default hover:underline duration-300"
            >
              Reply
            </button>
          </header>
          <p className="text-grey-darkest mt-6">
            <span className="text-purple-default font-bold "></span>
            {parseText(user.comment, "text-purple-default")}
          </p>
        </div>
      </div>

      {isOpen && (
        <ReplyPost
          username={user.username}
          reply={reply}
          setReply={setReply}
          createReply={createReply}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
