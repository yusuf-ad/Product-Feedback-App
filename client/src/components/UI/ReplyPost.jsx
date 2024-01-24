import { useEffect, useRef, useState } from "react";

import Error from "./Error";

export function ReplyPost({ reply, setReply, createReply, username }) {
  const [errorMsg, setErrorMsg] = useState("");

  const textArea = useRef(null);

  useEffect(() => {
    textArea.current.focus();

    textArea.current.value = `@${username} `;
  }, []);

  return (
    <>
      <div className="w-[calc(100%-76px)] mt-2 mb-6 self-end flex gap-8 items-start">
        <textarea
          ref={textArea}
          value={reply}
          onChange={(e) => {
            if (!e.target.value.trim()) setErrorMsg("");

            setReply(e.target.value);
            setErrorMsg("");
          }}
          className={`shadow-sm  bg-grey-light h-32 px-6 py-4 rounded-md w-full resize-none ${
            errorMsg
              ? "outline-red-default/70 text-red-default"
              : "outline-purple-default/50"
          }`}
          name="feedback-detail"
          id="detail"
          maxLength={255}
        ></textarea>
        <button
          onClick={() => {
            if (!reply.trim()) {
              textArea.current.focus();
              return setErrorMsg("Can't be empty.");
            }

            setReply((reply) => `${username} ${reply}`);

            setErrorMsg("");
            createReply();
            setReply("");
          }}
          className="btn ml-auto bg-purple-default hover:bg-purple-hover"
        >
          Post Reply
        </button>
      </div>
      {errorMsg && (
        <div className="-mt-8 ml-20">
          <Error message={errorMsg} />
        </div>
      )}
    </>
  );
}
