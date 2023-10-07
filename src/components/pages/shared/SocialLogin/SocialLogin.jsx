import { useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../../../hooks/useAuthContext";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

const SocialLogin = () => {
  // context
  const { googleLogin, githubLogin } = useAuthContext();

  // location
  const location = useLocation();
  // use Navigate
  const navigate = useNavigate();

  const handleSocialLogin = (socialLogin) => {
    socialLogin()
      .then(() => {
        toast.success("Sign In successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="divider">Login With</div>
      <div className="flex justify-around">
        <button
          onClick={() => handleSocialLogin(googleLogin)}
          className="btn btn-sm text-blue-500 hover:text-white bg-white hover:bg-blue-500  border-blue-500 hover:border-blue-500 rounded-md flex items-center"
        >
          <FaGoogle></FaGoogle>
          Google
        </button>
        <button
          onClick={() => handleSocialLogin(githubLogin)}
          className="btn btn-outline btn-sm rounded-md flex items-center"
        >
          <FaGithub></FaGithub>
          Github
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
