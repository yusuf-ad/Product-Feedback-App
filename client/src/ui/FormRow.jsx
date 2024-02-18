function FormRow({ label, message, children }) {
  return (
    <div>
      {label && (
        <label className="text-lg font-bold" htmlFor={children?.props.name}>
          {label}
        </label>
      )}
      {message && <p className="text-gray-600 ">{message}</p>}
      {children}
    </div>
  );
}

export default FormRow;
