import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FormRow from "../../ui/FormRow";
import InputField from "./InputField";
import SelectionField from "./SelectionField";
import TextAreaField from "./TextAreaField";
import { useFeedbacks } from "../../contexts/FeedbacksContext";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

const errorOptions = {
  required: "Can't be empty",
  validate: (value) => value.trim() !== "" || "Can't be empty",
};

function CreateFeedbackForm() {
  const { handleAddFeedback, isLoading } = useFeedbacks();
  const navigate = useNavigate();

  const { handleSubmit, formState, register, setValue, reset, watch } =
    useForm();

  const { errors } = formState;

  async function onSubmit(data) {
    await handleAddFeedback(data);

    reset();
    setValue("category", "");
    navigate("/");
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mt-12 flex flex-col gap-8"
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
        error={errors?.category?.message}
      >
        <SelectionField
          menuItems={["Feature", "UI", "UX", "Enhancement", "Bug"]}
          name={"category"}
          active={watch("category")}
          setValue={setValue}
        />
        <input type="hidden" {...register("category", errorOptions)} />
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

      <div className="mt-12 flex justify-end gap-4">
        <button
          onClick={() => navigate("/")}
          type="reset"
          className="btn bg-grey-darkest hover:bg-grey-darker-hover"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn bg-purple-default hover:bg-purple-hover"
        >
          Add Feedback
        </button>
      </div>
    </form>
  );
}

export default CreateFeedbackForm;
