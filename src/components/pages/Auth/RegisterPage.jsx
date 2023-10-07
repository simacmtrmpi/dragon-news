/* eslint-disable react/jsx-no-duplicate-props */
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import SocialLogin from "../shared/SocialLogin/SocialLogin";
import useAuthContext from "../../../hooks/useAuthContext";
import { useState } from "react";
import { PiWarningOctagonFill } from "react-icons/pi";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../../config/firebase";
import toast from "react-hot-toast";

const RegisterPage = () => {
  // use state
  const [registerError, setRegisterError] = useState("");
  console.log(registerError);
  const [nameError, setNameError] = useState("");
  //   const [urlError, setUrlError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");

  // context
  const { createUser } = useAuthContext();
  // navigate
  const navigate = useNavigate();

  //onchange Name
  const handleInputName = (event) => {
    const name = event.target.value;

    if (name.length < 5) {
      setNameError("Name should be at least 5 characters");
    } else {
      // Clear the error message when the name is valid
      setNameError("");
    }
  };

  //Onchange Email
  const handleInputEmail = (event) => {
    const email = event.target.value;

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  //Onchange Password
  const handleInputPassword = (event) => {
    const password = event.target.value;

    if (password.length < 6) {
      return setPasswordError("Password should be at least 6 characters");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(password)
    ) {
      return setPasswordError(
        "Password must contain at least one  lowercase letter, one uppercase letter, one digit, and be at least 6 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleCreateUser = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const url = event.target.url.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const checkbox = event.target.checkbox.checked;

    setRegisterError("");

    setCheckboxError("");
    setPasswordError("");
    setEmailError("");

    if (!checkbox) {
      return setCheckboxError("Please accept our terms & conditions");
    }

    createUser(email, password)
      .then(() => {
        // Profile update
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: url,
        })
          .then(() => {})
          .catch(() => {});

        //   Email verification
        sendEmailVerification(auth.currentUser).then(() => {
          toast.success(
            "You successfully create your account.Please check your email for verification"
          );
          navigate("/");
        });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setEmailError("Email already in use");
        }
        setRegisterError(error);
      });
  };

  return (
    <div>
      <div className="mt-6 lg:mt-10">
        <NavBar></NavBar>
        <div className="hero h-[70vh]">
          <div className="card w-full max-w-md shadow-2xl bg-base-100 px-16">
            <div className="text-center py-5 border-b">
              <h2 className="text-2xl font-semibold">Register your account</h2>
            </div>
            <form onSubmit={handleCreateUser} className="card-body px-0 pt-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  onChange={handleInputName}
                  type="name"
                  name="name"
                  placeholder="Enter your name"
                  className={`input input-bordered ${
                    nameError && "border-red-600"
                  }`}
                  required
                />
                {nameError && (
                  <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <span>
                      {" "}
                      <PiWarningOctagonFill></PiWarningOctagonFill>
                    </span>
                    {nameError}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL (optional)</span>
                </label>
                <input
                  type="url"
                  name="url"
                  placeholder="Enter your photo url"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={handleInputEmail}
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
                  onChange={handleInputPassword}
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
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  name=""
                  id="checkbox"
                />
                <label
                  className={checkboxError && "text-red-600"}
                  htmlFor="checkbox"
                >
                  Accept our
                  <a
                    className={`bg-gradient-to-r ${
                      !checkboxError
                        ? "from-[#FF8C47] to-[#F75B5F]"
                        : "text-red-600"
                    } text-transparent bg-clip-text font-semibold ml-2`}
                    href=""
                  >
                    Terms & Conditions
                  </a>
                </label>
              </div>
              {checkboxError && (
                <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                  <span>
                    <PiWarningOctagonFill></PiWarningOctagonFill>
                  </span>
                  {checkboxError}
                </p>
              )}
              <div className="form-control mt-4">
                <button type="submit" className="btn btn-neutral rounded-md">
                  Register
                </button>
              </div>

              <div className="mt-3 text-center">
                <h3>
                  Already Have An Account ?
                  <Link
                    to={"/login"}
                    className="bg-gradient-to-r from-[#FF8C47] to-[#F75B5F] text-transparent bg-clip-text font-semibold ml-2"
                  >
                    Login
                  </Link>
                </h3>
              </div>

              <SocialLogin></SocialLogin>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
