import { useEffect, useRef, useState } from "react";

import Error from "../../ui/Error";

export function ReplyPost({ reply, setReply, createReply, username }) {
  const [errorMsg, setErrorMsg] = useState("");

  const textArea = useRef(null);

  useEffect(() => {
    textArea.current.focus();

    textArea.current.value = `@${username} `;
  }, []);

  return (
    <>
      <div className="mb-6 mt-2 flex w-[calc(100%-76px)] items-start gap-8 self-end">
        <textarea
          ref={textArea}
          value={reply}
          onChange={(e) => {
            if (!e.target.value.trim()) setErrorMsg("");

            setReply(e.target.value);
            setErrorMsg("");
          }}
          className={`h-32  w-full resize-none rounded-md bg-grey-light px-6 py-4 shadow-sm ${
            errorMsg
              ? "text-red-default outline-red-default/70"
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
