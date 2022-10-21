import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "../utils/Firebase/firebase";
import { Link } from "react-router-dom";

import MaterialsLoading from "./MaterialsLoading";
import axios from "axios";

// [TODO] -> We'll finaly have a normal fetch, with the new backend

const OLDgetGrid = async (type) => {
  const grid = await getDocs(collection(getFirestore(app), type));
  // const gridQuery = query(collection(getFirestore(app), type), limit());

  const promisesA = grid?.docs.map((item) => getAuthor(item.data().Author.id));
  const authors = await Promise.all(promisesA);
  let i = 0; // Най-C-яджийският начин да се направи
  const promises = grid?.docs.map((item) => {
    const author = authors[i++]; // буквално, ще бъде направено със Promises, ама не сега + това работи
    console.log(author);
    return {
      title: item.data().title,
      link: "/materials/type=" + type + "/uuid=" + item.id,
      thumbnail: "#",
      type: type,
      subject: item.data().info.specs.subject,
      class: item.data().info.specs.class,
      authors: [
        {
          name: author.FirstName + " " + author.LastName,
          imageUrl: author.profileUrl,
          profileUrl: "/user/id=" + author.id,
        },
      ],
    };
  });
  const gridData = await Promise.all(promises);
  return gridData;
};

const Material = ({ info }) => {
  const type = {
    Presentations: "презентация по",
    Documents: "план по",
    Pictures: "материал за",
  };

  // console.log(info)
  return (
    <Link
      to={info.link || "#"}
      className="flex flex-col dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border"
    >
      <img
        src={info.thumbnail === "#" ? "/seduthumb.png" : info.thumbnail}
        className="thumbnail aspect-video rounded-2xl"
      />
      <div className="flex items-center p-3 space-x-4">
        <div to="">
          <img
            src={info.authors[0].imageUrl || "/img/default.png"}
            className="w-12 block aspect-square rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{info.title}</h3>
          <p className="text-sm text-gray-500">
            {type[info?.type]} {info?.subject || "(null)"} {info?.class}
          </p>
          {info.authors.map((author, index) => (
            <p key={index} className="text-sm text-gray-500">
              {author.name}
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
    console.log("Fetching grid data...", groupBy);
  }, []);


  useEffect(() => {
    setLoading(true);
    console.log("Fetching grid data...");
    axios
      .get("https://monkfish-app-swhuo.ondigitalocean.app/api/post/get-grid", {
        orderBy: "views",
        parsePost: {
          tags: [],
          subject: "",
          type: { groupBy },
          grade: 0,
        },
      })
      .then((response) => {
        console.log("OPPA", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [groupBy]);

  // [TODO] Animation between skeleton and grid
  if (loading) return <MaterialsLoading limit={12} />;

  return (
    <div className="w-full flex flex-col justify-content items-center m-auto transition ease-in-out delay-150">
      <div className="materials w-11/12 lg:p-5 pt-5 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4 gap-y-6">
        {grid.length > 0 ? (
          grid.map((info) => <Material key={info.link} info={info} />)
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
