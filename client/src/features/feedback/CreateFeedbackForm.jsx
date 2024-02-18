import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import InputField from "./InputField";
import SelectionField from "./SelectionField";
import TextAreaField from "./TextAreaField";

function CreateFeedbackForm() {
  const { handleSubmit, formState, register, setValue } = useForm();

  function onSubmit(data) {
    console.log("data -> ", data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 flex flex-col gap-8"
    >
      <FormRow
        label={"Feedback Title"}
        message={"Add a short, descriptive headline"}
      >
        <InputField name={"title"} type={"text"} register={register} />
      </FormRow>

      <FormRow
        label={"Category"}
        message={"Choose a category for your feedback"}
      >
        <SelectionField
          name={"category"}
          register={register}
          setValue={setValue}
        />
      </FormRow>

      <FormRow
        label={"Feedback Details"}
        message={
          "Include any specific comments on what should be improved, added, etc."
        }
      >
        <TextAreaField name={"details"} register={register} />
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
