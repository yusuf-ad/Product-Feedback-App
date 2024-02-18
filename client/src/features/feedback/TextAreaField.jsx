function TextAreaField({ name, register }) {
  return (
    <textarea
      className={`mt-5 h-24 w-full resize-none rounded-md bg-grey-light px-6 py-4 shadow-sm`}
      id={name}
      maxLength={255}
      {...register(name)}
    ></textarea>
  );
}

export default TextAreaField;

// ? "text-red-default outline-red-default/70"
// : "outline-purple-default/50"
