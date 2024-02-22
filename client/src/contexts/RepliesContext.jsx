import { createContext, useContext, useState } from "react";
import BASE_URL from "../utils/BASE_URL";
import { faker } from "@faker-js/faker";

const ReplyContext = createContext();

const initialState = {
  replies: [],
  createReply: () => {},
};

function RepliesProvider({ children }) {
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getReplies(commentId) {
    const res = await fetch(`${BASE_URL}/replies/${commentId}`);
    const { data } = await res.json();

    setReplies(data.replies);
  }

  async function createReply(commentId, newReply) {
    try {
      const res = await fetch(`${BASE_URL}/replies/${commentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: faker.person.fullName(),
          username: undefined,
          comment: newReply,
          userImg: faker.image.avatar(),
        }),
      });
      const { data } = await res.json();

      setReplies((replies) => [...replies, data.reply]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ReplyContext.Provider value={{ replies, getReplies, createReply }}>
      {children}
    </ReplyContext.Provider>
  );
}

function useReplies() {
  const value = useContext(ReplyContext);

  if (value === undefined)
    throw new Error(
      "CommentsContext was used outside of the CommentsContextProvider"
    );

  return value;
}

export { RepliesProvider, useReplies };
