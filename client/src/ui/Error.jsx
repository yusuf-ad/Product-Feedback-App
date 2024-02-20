function Error({ message = "Can't be empty" }) {
  return <p className=" text-red-500 text-base">{message}</p>;
}

export default Error;
