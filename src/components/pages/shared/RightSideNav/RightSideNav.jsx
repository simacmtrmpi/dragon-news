import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import QZone1 from "../../../../assets/qZone1.png";
import QZone2 from "../../../../assets/qZone2.png";
import QZone3 from "../../../../assets/qZone3.png";
import bg from "../../../../assets/bg.png";
import useAuthContext from "../../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RightSideNav = () => {
  // context
  const { googleLogin, githubLogin } = useAuthContext();

  // use Navigate
  const navigate = useNavigate();

  const handleSocialLogin = (socialLogin) => {
    socialLogin()
      .then(() => {
        toast.success("Sign In successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-5">Login With</h2>
        <button
          onClick={() => handleSocialLogin(googleLogin)}
          className="w-full btn btn-outline text-blue-500 hover:text-white hover:bg-blue-500 hover:border-none mb-3"
        >
          <FaGoogle></FaGoogle>
          <span className="hidden lg:flex">Login With</span> Google
        </button>
        <button
          onClick={() => handleSocialLogin(githubLogin)}
          className="w-full flex btn btn-outline"
        >
          <FaGithub></FaGithub>{" "}
          <span className="hidden lg:flex">Login With</span> Github
        </button>
      </div>

      {/* find us on*/}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-5">Find Us On</h2>
        <a
          className="flex items-center gap-2 p-4 border-2 rounded-t-lg"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook></FaFacebook>{" "}
          <span className="hover:underline">Facebook</span>
        </a>
        <a
          className="flex items-center gap-2 p-4 border-x-2"
          href="https://twitter.com/"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter></FaTwitter>{" "}
          <span className="hover:underline">Twitter</span>
        </a>
        <a
          className="flex items-center gap-2 p-4 border-2 rounded-b-lg"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram></FaInstagram>{" "}
          <span className="hover:underline">Instagram</span>
        </a>
      </div>

      {/* Q zone */}
      <div className="bg-[#F3F3F3] p-4">
        <h2 className="text-xl font-semibold mb-5">Q Zone</h2>
        <img className="mx-auto" src={QZone1} alt="" />
        <img className="mx-auto" src={QZone2} alt="" />
        <img className="mx-auto" src={QZone3} alt="" />
      </div>

      {/* Create an Amazing Newspaper */}
      <div
        className="bg-cover bg-center my-5 px-20 md:px-6 py-14 md:py-10 lg:px-10 lg:py-16 text-white text-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <h3 className="text-3xl md:text-lg lg:text-2xl xl:text-3xl font-bold mb-5">
          Create an Amazing Newspaper
        </h3>
        <p className="mb-8 md:text-xs lg:text-sm xl:text-base">
          Discover thousands of options, easy to customize layouts, one-click to
          import demo and much more.
        </p>
        <button className="btn md:btn-sm lg:btn-md text-white bg-[#D72050] hover:text-white hover:bg-[#D72050] border-none rounded">
          <span className="md:text-xs lg:text-sm">Learn More</span>
        </button>
      </div>
    </div>
  );
};

export default RightSideNav;
