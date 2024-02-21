import { useForm } from "react-hook-form";
import { useComments } from "../../contexts/CommentsContext";
import FormRow from "../../ui/FormRow";
import TextAreaField from "../../ui/TextAreaField";

export function CreateComment({ feedbackId }) {
  const { handleSubmit, register, watch, reset } = useForm();
  const { createComment, commentsLoading } = useComments();

  function onSubmit(data) {
    const { newComment } = data;

    createComment(feedbackId, newComment);

    reset();
  }

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl">Add Comment</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <div className="h-36 mt-6 mb-12">
            <TextAreaField name={"newComment"} register={register} />
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
