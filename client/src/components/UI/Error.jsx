function Error({ message = "Can't be empty" }) {
  return <p className="mt-4 text-red-500 text-lg">{message}</p>;
}

export default Error;
