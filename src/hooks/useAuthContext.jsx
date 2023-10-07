import { useContext } from "react";
import { AuthContextAPI } from "../contexts/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContextAPI);
  return context;
};

export default useAuthContext;
