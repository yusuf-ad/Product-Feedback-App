import { useEffect } from "react";
import { useFeedbacks } from "../../contexts/FeedbacksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import InputField from "../../ui/InputField";
import SelectionField from "../../ui/SelectionField";
import TextAreaField from "../../ui/TextAreaField";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

const errorOptions = {
  required: "Can't be empty",
  validate: (value) => value.trim() !== "" || "Can't be empty",
};

function EditFeedbackForm({ handleReturnBack }) {
  const {
    currentFeedback: feedback,
    handleGetFeedback,
    handleUpdateFeedback,
    handleDeleteFeedback,
    isLoading,
  } = useFeedbacks();

  const { title, category, details, status } = feedback;

  const { register, handleSubmit, reset, watch, setValue, formState } = useForm(
    {
      defaultValues: {
        title,
        category,
        details,
        status,
      },
    }
  );

  const { errors } = formState;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetFeedback(id);
  }, [handleGetFeedback, id]);

  useEffect(() => {
    reset({
      // `reset` fonksiyonunu kullanarak formun varsayılan değerlerini güncelleyin
      title: feedback.title,
      category: feedback.category,
      details: feedback.details,
      status: feedback.status,
    });
  }, [feedback, reset]);

  async function handleDelete() {
    await handleDeleteFeedback(id);

    navigate("/");
  }

  async function onSubmit(data) {
    await handleUpdateFeedback(id, data);

    handleReturnBack();
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-16 flex flex-col gap-8"
    >
      <FormRow
        label={"Feedback Title"}
        message={"Add a short, descriptive headline"}
        error={errors?.title?.message}
      >
        <InputField
          name={"title"}
          type={"text"}
          options={errorOptions}
          register={register}
          error={errors?.title?.message}
        />
      </FormRow>

      <FormRow
        label={"Category"}
        message={"Choose a category for your feedback"}
      >
        <SelectionField
          menuItems={["Feature", "UI", "UX", "Enhancement", "Bug"]}
          name={"category"}
          active={watch("category")}
          setValue={setValue}
        />
        <input type="hidden" {...register("category", errorOptions)} />
      </FormRow>

      <FormRow label={"Update Status"} message={"Change feature state"}>
        <SelectionField
          menuItems={["Suggestion", "Planned", "In-Progress", "Live"]}
          name={"status"}
          active={watch("status")}
          setValue={setValue}
        />
        <input type="hidden" {...register("status", errorOptions)} />
      </FormRow>

      <FormRow
        label={"Feedback Details"}
        message={
          "Include any specific comments on what should be improved, added, etc."
        }
        error={errors?.details?.message}
      >
        <TextAreaField
          name={"details"}
          register={register}
          options={errorOptions}
          error={errors?.details?.message}
        />
      </FormRow>

      <div className="mt-10 flex gap-4">
        <button
          type="button"
          onClick={handleDelete}
          className="btn bg-red-default hover:bg-red-hover"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={handleReturnBack}
          className="btn ml-auto bg-grey-darkest hover:bg-grey-darker-hover"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn bg-purple-default hover:bg-purple-hover"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditFeedbackForm;
