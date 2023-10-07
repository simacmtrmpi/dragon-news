import logo from "../../../../assets/logo.png";
import moment from "moment";

const Header = () => {
  return (
    <div className="text-center">
      <img className="mx-auto mt-12 mb-5" src={logo} alt="" />
      <p>Journalism Without Fear or Favour</p>
      <p className="text-xl font-medium mt-3 mb-8">
        {moment().format("dddd, MMMM D, YYYY")}
      </p>
    </div>
  );
};

export default Header;
