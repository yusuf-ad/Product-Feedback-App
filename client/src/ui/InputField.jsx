function InputField({ name, type, options = {}, register, error }) {
  return (
    <input
      className={`h-full w-full rounded-md bg-grey-light px-6 shadow-sm ${
        error
          ? "text-red-default outline-red-default/70"
          : "outline-purple-default/50"
      }`}
      id={name}
      type={type}
      {...register?.(name, options)}
    />
  );
}

export default InputField;
