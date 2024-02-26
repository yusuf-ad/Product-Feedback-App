import { useForm } from "react-hook-form";
import { useComments } from "../../contexts/CommentsContext";
import FormRow from "../../ui/FormRow";
import TextAreaField from "../../ui/TextAreaField";
import { useFeedbacks } from "../../contexts/FeedbacksContext";

const errorOptions = {
  required: "Can't be empty",
  validate: (value) => value.trim() !== "" || "Can't be empty",
};

export function CreateComment({ feedbackId }) {
  const { handleSubmit, register, watch, reset, formState } = useForm();
  const { createComment, commentsLoading } = useComments();
  const { setCurrentFeedback } = useFeedbacks();

  const { errors } = formState;

  function onSubmit(data) {
    const { newComment } = data;

    createComment(feedbackId, newComment);

    setCurrentFeedback((currentFeedback) => ({
      ...currentFeedback,
      totalComments: currentFeedback.totalComments + 1,
    }));

    reset();
  }

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl">Add Comment</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow error={errors?.newComment?.message}>
          <div className="h-36 mt-6 mb-12">
            <TextAreaField
              name={"newComment"}
              register={register}
              options={errorOptions}
              error={errors?.newComment?.message}
            />
          </div>
        </FormRow>

        <div className="mt-10 flex items-center justify-between">
          <p>{255 - watch("newComment")?.trim().length} characters left</p>

          <button
            disabled={commentsLoading}
            className="btn bg-purple-default hover:bg-purple-hover disabled:bg-purple-default/50 disabled:cursor-progress"
          >
            Post Comment
          </button>
        </div>
      </form>
    </section>
  );
}
