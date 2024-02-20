import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import InputField from "./InputField";
import SelectionField from "./SelectionField";
import TextAreaField from "./TextAreaField";

function CreateFeedbackForm() {
  const { handleSubmit, formState, register, setValue, getValues } = useForm();

  const { errors } = formState;

  function onSubmit(data) {}

  function onError(errors) {
    console.log(errors);
  }

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
          options={{
            required: "Can't be empty",
            validate: (value) => value.trim() !== "" || "Can't be empty",
          }}
          register={register}
          error={errors?.title?.message}
        />
      </FormRow>

      <FormRow
        label={"Category"}
        message={"Choose a category for your feedback"}
      >
        <SelectionField
          name={"category"}
          setValue={setValue}
          register={register}
        />
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
          options={{
            required: "Can't be empty",
            validate: (value) => value.trim() !== "" || "Can't be empty",
          }}
          error={errors?.details?.message}
        />
      </FormRow>

      <div className="mt-12 flex justify-end gap-4">
        <button
          type="reset"
          className="btn bg-grey-darkest hover:bg-grey-darker-hover"
        >
          Cancel
        </button>
        <button className="btn bg-purple-default hover:bg-purple-hover">
          Add Feedback
        </button>
      </div>
    </form>
  );
}

export default CreateFeedbackForm;
