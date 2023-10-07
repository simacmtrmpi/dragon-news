import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import SocialLogin from "../shared/SocialLogin/SocialLogin";
import useAuthContext from "../../../hooks/useAuthContext";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../../config/firebase";
import { PiWarningOctagonFill } from "react-icons/pi";

const LoginPage = () => {
  // use state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // use ref
  const emailRef = useRef();

  // context
  const { loginUser } = useAuthContext();
  // location
  const location = useLocation();
  // navigate
  const navigate = useNavigate();

  const handleUserLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    setEmailError("");
    setPasswordError("");

    loginUser(email, password)
      .then(() => {
        toast.success("Login successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        if (
          error.message === "Firebase: Error (auth/invalid-login-credentials)."
        ) {
          setPasswordError("Invalid password mismatch");
        } else if (
          error.message ===
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        ) {
          setPasswordError(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. "
          );
        }
      });
  };

  // forget password function
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    console.log(email);
    if (email.length === 0) {
      return setEmailError("Please provide an email address.");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setEmailError("Please enter a valid email address.");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Please check yor email");
      })
      .catch(() => {});
  };

  return (
    <div className="mt-6 lg:mt-10">
      <NavBar></NavBar>
      <div className="hero h-[70vh]">
        <div className="card w-full max-w-md shadow-2xl bg-base-100 px-16">
          <div className="text-center pt-14 pb-10 border-b">
            <h2 className="text-2xl font-semibold">Login your account</h2>
          </div>
          <form onSubmit={handleUserLogin} className="card-body px-0">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`input input-bordered ${
                  emailError && "border-red-600"
                }`}
                required
              />
              {emailError && (
                <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                  <span>
                    <PiWarningOctagonFill></PiWarningOctagonFill>
                  </span>
                  {emailError}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className={`input input-bordered ${
                  passwordError && "border-red-600"
                }`}
                required
              />
              {passwordError && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                  <span>
                    <PiWarningOctagonFill></PiWarningOctagonFill>
                  </span>
                  {passwordError}
                </div>
              )}
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-neutral rounded-md">
                Login
              </button>
            </div>
            <div className="mt-3 text-center">
              <h3>
                Don&apos;t Have An Account ?
                <Link
                  to={"/register"}
                  className="bg-gradient-to-r from-[#FF8C47] to-[#F75B5F] text-transparent bg-clip-text font-semibold ml-2"
                >
                  Register
                </Link>
              </h3>
            </div>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
