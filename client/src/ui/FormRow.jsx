function FormRow({ label, message, children, error }) {
  return (
    <div>
      {label && (
        <label className="text-lg font-bold" htmlFor={children?.props.name}>
          {label}
        </label>
      )}
      {message && <p className="text-gray-600 ">{message}</p>}
      {children}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}

export default FormRow;
