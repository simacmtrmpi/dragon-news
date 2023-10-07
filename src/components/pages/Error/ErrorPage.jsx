import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl">
          <span className="text-9xl font-extrabold">404</span> - Page Not Found
        </h1>
        <p className="text-xl mt-5">
          Oops!!! The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn btn-neutral rounded-md mt-5">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
