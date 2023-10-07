import PropTypes from "prop-types";
import useAuthContext from "../hooks/useAuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRouter = ({ children }) => {
  const { user, loader } = useAuthContext();
  // location
  const location = useLocation();

  if (loader) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <span className="loading loading-spinner text-[#D72050]"></span>
      </div>
    );
  } else if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  }
};

PrivetRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivetRouter;
