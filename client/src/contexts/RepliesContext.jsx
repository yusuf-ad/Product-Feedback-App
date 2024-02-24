import { createContext, useCallback, useContext, useState } from "react";
import BASE_URL from "../utils/BASE_URL";
import { faker } from "@faker-js/faker";

const initialState = {
  getReplies: [],
  createReply: {},
};

const ReplyContext = createContext(initialState);

function RepliesProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const getReplies = useCallback(async function (commentId) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/replies/${commentId}`);
      const { data } = await res.json();

      return data.replies;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function createReply(commentId, newReply) {
    setIsLoading(true);
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

      return data.reply;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ReplyContext.Provider value={{ getReplies, createReply, isLoading }}>
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
