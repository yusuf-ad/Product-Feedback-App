function InputField({ name, type, register }) {
  return (
    <input
      className={`mt-5 h-14 w-full rounded-md bg-grey-light px-6 shadow-sm`}
      id={name}
      type={type}
      {...register(name)}
    />
  );
}

export default InputField;

// ? "text-red-default outline-red-default/70"
// : "outline-purple-default/50"
