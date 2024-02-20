function TextAreaField({ name, register, options, error }) {
  return (
    <textarea
      className={`mt-5 h-24 w-full resize-none rounded-md bg-grey-light px-6 py-4 shadow-sm ${
        error
          ? "text-red-default outline-red-default/70"
          : "outline-purple-default/50"
      }`}
      id={name}
      maxLength={255}
      {...register(name, options)}
    ></textarea>
  );
}

export default TextAreaField;
