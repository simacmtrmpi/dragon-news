import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LeftSideNav = () => {
  const [categories, setCategories] = useState([]);

  // use effect
  useEffect(() => {
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">All Category</h2>
      {categories?.map((category) => {
        return (
          <Link
            className={`block text-lg font-medium px-10 py-4 ${({
              isActive,
              isPending,
            }) => (isPending ? "pending" : isActive ? "bg-[#E7E7E7]" : "")}`}
            key={category.id}
            to={`/category/${category.id}`}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
};

export default LeftSideNav;
