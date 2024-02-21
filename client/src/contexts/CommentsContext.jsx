import { createContext, useContext, useState, useCallback } from "react";

import { faker } from "@faker-js/faker";

import BASE_URL from "../utils/BASE_URL";

const CommentsContext = createContext({
  comments: [],
  commentsLoading: false,
  getComments: () => {},
  createComment: () => {},
});

function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);

  const [commentsLoading, setCommentsLoading] = useState(true);

  const getComments = useCallback(async function (id) {
    setCommentsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/comments/${id}`);
      const { data } = await res.json();

      setComments(data.comments);
    } catch (err) {
      console.error(err);
    } finally {
      setCommentsLoading(false);
    }
  }, []);

  async function createComment(id, newComment) {
    console.log(newComment);

    setCommentsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: faker.person.fullName(),
          username: undefined,
          comment: newComment,
          userImg: faker.image.avatar(),
        }),
      });
      const { data } = await res.json();

      setComments((comments) => [...comments, data.comment]);
    } catch (err) {
      console.log(err);
    } finally {
      setCommentsLoading(false);
    }
  }

  return (
    <CommentsContext.Provider
      value={{
        getComments,
        comments,
        commentsLoading,
        createComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

function useComments() {
  const value = useContext(CommentsContext);

  if (value === undefined)
    throw new Error(
      "CommentsContext was used outside of the CommentsContextProvider"
    );

  return value;
}

export { CommentsProvider, useComments };
