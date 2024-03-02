function TextAreaField({ name, register, options = {}, error, disabled }) {
  return (
    <textarea
      className={`h-full w-full resize-none rounded-md bg-grey-light px-6 py-4 shadow-sm disabled:cursor-progress ${
        error
          ? "text-red-default outline-red-default/70"
          : "outline-purple-default/50"
      }`}
      id={name}
      disabled={disabled}
      maxLength={255}
      {...register(name, options)}
    ></textarea>
  );
}

export default TextAreaField;
