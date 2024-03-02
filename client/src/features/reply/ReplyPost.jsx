import { useForm } from "react-hook-form";
import { useReplies } from "../../contexts/RepliesContext";

import Error from "../../ui/Error";
import TextAreaField from "../../ui/TextAreaField";
import { useRef } from "react";

const errorOptions = {
  required: "Can't be empty",
  validate: (value) => value.trim() !== "" || "Can't be empty",
};

export function ReplyPost({ commentId, username, setIsOpen, setReplies }) {
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { newReply: `@${username}` },
  });
  const { createReply, isLoading } = useReplies();

  const { errors } = formState;

  async function onSubmit(data) {
    const { newReply } = data;

    const reply = await createReply(commentId, newReply);

    setReplies((replies) => [...replies, reply]);

    setIsOpen(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 mt-2 flex w-[calc(100%-76px)] items-start gap-8 self-end"
    >
      <div className="w-full h-28">
        <TextAreaField
          name={"newReply"}
          register={register}
          options={errorOptions}
          error={errors?.newReply?.message}
          disabled={isLoading}
        />
        {errors?.newReply?.message && <Error>{errors.newReply.message}</Error>}
      </div>

      <button
        disabled={isLoading}
        className="btn ml-auto bg-purple-default hover:bg-purple-hover disabled:bg-purple-default/50  disabled:cursor-progress"
      >
        Post Reply
      </button>
    </form>
  );
}
