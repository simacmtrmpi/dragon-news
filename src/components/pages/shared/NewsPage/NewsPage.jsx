import { Link, useLoaderData, useParams } from "react-router-dom";
import Header from "../Header/Header";
import RightSideNav from "../RightSideNav/RightSideNav";

const NewsPage = () => {
  const { id } = useParams();

  const allNews = useLoaderData();
  const newsPage = allNews.find((news) => news._id === id);
  console.log(newsPage);

  const editorsInsight = allNews.filter(
    (news) => news.others_info.is_todays_pick === true
  );
  console.log(editorsInsight);

  const { details, image_url, title } = newsPage;

  return (
    <div>
      <Header></Header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-3">
          <h3 className="text-xl font-semibold mb-5">Dragon News</h3>

          <div className="p-5 border-2 rounded-md">
            <img src={image_url} alt="" />
            <h3 className="mt-5 mb-3 text-2xl font-bold">{title}</h3>
            <p>{details}</p>
            <Link
              to={"/"}
              className="btn btn-sm lg:btn-md bg-[#D72050] hover:bg-[#D72050] text-white font-medium rounded mt-8"
            >{`<--All news in this category`}</Link>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-5">Editors Insight</h3>
            <div className="flex justify-between gap-6 rounded-lg">
              {editorsInsight.slice(0, 3).map((news) => (
                <div key={news?._id} className=" ">
                  <img
                    className="w-full h-40 bg-cover"
                    src={news?.thumbnail_url}
                    alt=""
                  />
                  <h3 className="text-xl font-semibold my-5">{news?.title}</h3>
                  <div className="flex items-center gap-2">
                    <img src="" alt="" />
                    <p>{news?.author?.published_date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <RightSideNav></RightSideNav>
      </div>
    </div>
  );
};

export default NewsPage;
