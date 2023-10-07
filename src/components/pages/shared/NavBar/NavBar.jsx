import { Link, NavLink } from "react-router-dom";
import avatar from "../../../../assets/user.png";
import useAuthContext from "../../../../hooks/useAuthContext";

const NavBar = () => {
  const { logout, user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " text-white bg-[#D72050] px-2 lg:px-3 py-1 rounded"
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/about"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " text-white bg-[#D72050] px-2 lg:px-3 py-1 rounded"
              : ""
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/career"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " text-white bg-[#D72050] px-2 lg:px-3 py-1 rounded"
              : ""
          }
        >
          Career
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar justify-between p-0 bg-base-100 mb-20 hidden md:flex">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <ul className="flex items-center gap-3 md:gap-6 text-xs md:text-sm lg:text-base">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <img
            className="w-8 lg:w-12 mr-2 lg:mr-3 rounded-full"
            src={user?.photoURL ? user.photoURL : avatar}
            alt=""
          />
          {!user ? (
            <Link
              className="btn btn-xs md:btn-sm lg:btn-md bg-black hover:bg-black text-white lg:text-lg font-medium px-4 md:px-5 lg:px-8 lg:py-2 rounded"
              to={"/login"}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleClick}
              className="btn btn-xs md:btn-sm lg:btn-md bg-black hover:bg-black text-white lg:text-lg font-medium px-4 md:px-5 lg:px-8 lg:py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <div>
        {/* for mobile device */}
        <div className="md:hidden mb-5">
          <ul className="flex justify-end items-center gap-4 text-[10px]">
            {navLinks}
            <li className="flex items-center gap-2 ml-5 rounded-full">
              <Link>
                <img
                  className="w-7"
                  src={user?.photoURL ? user.photoURL : avatar}
                  alt=""
                />
              </Link>
              {!user ? (
                <Link
                  className="btn btn-neutral btn-xs text-white rounded"
                  to={"/login"}
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleClick}
                  className="btn btn-neutral btn-xs text-white rounded"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
