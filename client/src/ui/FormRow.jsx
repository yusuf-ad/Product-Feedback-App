import Error from "./Error";

function FormRow({ label, message, children, error }) {
  return (
    <div>
      {label && (
        <label className="text-lg font-bold" htmlFor={children?.props?.name}>
          {label}
        </label>
      )}
      {message && <p className="text-gray-600 ">{message}</p>}
      {children}
      {error && (
        <div className="mt-3">
          <Error message={error} />
        </div>
      )}
    </div>
  );
}

export default FormRow;
