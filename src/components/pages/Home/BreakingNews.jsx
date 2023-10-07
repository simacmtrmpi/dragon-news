import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const BreakingNews = () => {
  return (
    <div className="flex mb-6">
      <button className="btn btn-sm lg:btn-md bg-[#D72050] hover:bg-[#D72050] text-white mr-5 rounded">
        Latest
      </button>
      <Marquee pauseOnHover={true}>
        <Link className="mr-20 text-xs md:text-sm lg:text-base">
          Match Highlights: Germany vs Spain — as it happened !
        </Link>
        <Link className="mr-20 text-xs md:text-sm lg:text-base">
          Match Highlights: Germany vs Spain — as it happened !
        </Link>
        <Link className="mr-20 text-xs md:text-sm lg:text-base">
          Match Highlights: Germany vs Spain — as it happened !
        </Link>
      </Marquee>
    </div>
  );
};

export default BreakingNews;
