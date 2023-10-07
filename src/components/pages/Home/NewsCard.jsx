import icon1 from "../../../assets/Frame (5).svg";
import icon2 from "../../../assets/Frame (6).svg";
import icon3 from "../../../assets/Frame (7).svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NewsCard = ({ news }) => {
  const {
    author,
    details,
    image_url,
    others_info,
    rating,
    title,
    total_view,
    _id,
  } = news;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">Dragon News Home</h3>
      {/* single card */}
      <div className=" mb-8">
        {/* profile */}
        <div className="flex items-center justify-between bg-[#F3F3F3] p-5 rounded-t-xl">
          <div className="flex items-start gap-4">
            <img className="w-10 h-10 rounded-full" src={author?.img} alt="" />
            <div className="">
              <h3 className="font-semibold">{author?.name}</h3>
              <h4 className="text-sm">{author?.published_date}</h4>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={icon2} alt="" />
            <img src={icon3} alt="" />
          </div>
        </div>

        {/* title */}
        <div className="p-4 border-x-2 border-b-2 rounded-b-xl">
          <div className="pb-5 border-b-2">
            <h3>{title}</h3>
            {image_url && <img className="mt-5 mb-8" src={image_url} alt="" />}
            {details.length > 200 ? (
              <p>
                {details.slice(0, 200)}...
                <Link
                  to={`/news/${_id}`}
                  className="text-[#D72050] font-medium hover:underline"
                >
                  Read More
                </Link>
              </p>
            ) : (
              <p>{details}</p>
            )}
          </div>

          {/* rating and watching */}
          <div className="flex items-center justify-between mt-4">
            <div className="">
              <h4>{rating.number}</h4>
            </div>
            <div className="flex items-center gap-2">
              {others_info?.is_trending ? <img src={icon1} alt="" /> : null}

              <h4>{total_view}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};

export default NewsCard;
