import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import MaterialsLoading from "./MaterialsLoading";

const TYPE = {
  Presentations: "презентация по",
  Documents: "план по",
  Pictures: "материал за",
};

const Material = ({ authors, post, tags, files, token }) => {
  return (
    <Link
      to={"/materials/token=" + token}
      className="flex flex-col dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border"
    >
      <img
        src={"/seduthumb.png"}
        className="thumbnail aspect-video rounded-2xl"
      />
      <div className="flex items-center p-3 space-x-4">
        <div to="">
          <img
            src={authors[0].User.Avatar || "/img/default.png"}
            className="w-12 block aspect-square rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{post.Title}</h3>
          <p className="text-sm text-gray-500">
            {post.PostType.Name} {post.PostSubject.Name || "(null)"}{" "}
            {post.Grade}
          </p>
          {authors.map((author, index) => (
            <p key={index} className="text-sm text-gray-500">
              {author.User.FirstName}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

const Materials = ({ groupBy }) => {
  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .post("https://monkfish-app-swhuo.ondigitalocean.app/api/post/get-grid", {
        orderBy: "views",
        parsePost: {
          tags: [],
          subject: "",
          type: groupBy,
          grade: 0,
        },
      })
      .then((response) => {
        console.log("OPPA", response);
        setGrid(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [groupBy]);

  if (loading) return <MaterialsLoading limit={12} />;

  return (
    <div className="w-full flex flex-col justify-content items-center m-auto transition ease-in-out delay-150">
      <div className="materials w-11/12 lg:p-5 pt-5 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4 gap-y-6">
        {grid.length > 0 ? (
          grid.map((material) => (
            <Material key={material.post.ID} {...material} />
          ))
        ) : (
          <div className="w-full flex flex-col justify-content items-center m-auto">
            {" "}
            <h1 className="text-xl font-bold">Няма намерени материали</h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Materials;
