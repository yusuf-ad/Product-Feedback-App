import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1 className="text-red-700 text-4xl"> 404 NOT FOUND</h1>

      <Link to="/" className="text-blue-700 text-2xl mt-8 block underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
