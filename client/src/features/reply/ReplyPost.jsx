import { useForm } from "react-hook-form";
import { useReplies } from "../../contexts/RepliesContext";

import Error from "../../ui/Error";
import TextAreaField from "../../ui/TextAreaField";

const errorOptions = {
  required: "Can't be empty",
  validate: (value) => {
    if (value.trim() === "") {
      return "Can't be empty";
    } else if (value.length > 250) {
      return "Max length is 250 characters";
    }
    return true;
  },
};

export function ReplyPost({ commentId, username, setIsOpen, setReplies }) {
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { newReply: `@${username}` },
    mode: "onChange",
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
      className="mb-6 mt-2 flex w-[calc(100%-76px)] items-start gap-12 self-end"
    >
      <div className="w-full">
        <div className="w-full h-32 mb-4">
          <TextAreaField
            name={"newReply"}
            register={register}
            options={{
              ...errorOptions,
              maxLength: {
                value: 200,
                message: "Max length is 200 characters",
              },
            }}
            error={errors?.newReply?.message}
            disabled={isLoading}
          />
        </div>
        {errors?.newReply?.message && <Error>{errors?.newReply.message}</Error>}
      </div>

      <button
        disabled={isLoading}
        className="btn ml-auto bg-purple-default hover:bg-purple-hover disabled:bg-purple-default/50 disabled:cursor-progress"
      >
        Post Reply
      </button>
    </form>
  );
}
