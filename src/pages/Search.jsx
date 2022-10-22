import {
  Hits,
  InstantSearch,
  SearchBox,
  connectHighlight,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import { getDoc, doc } from "firebase/firestore";
import { useRef } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "../utils/Firebase/firebase";
import { Link } from "react-router-dom";

const searchClient = algoliasearch(
  "ZG1CIQ3EAR",
  "e173b451d61a8152f059f1cbcbdb6ed2"
);

const Search = () => {
  const clickPoint = useRef();
  const handleFocus = () => {
    clickPoint.current.style.display = "none";
  };

  const handleBlur = () => {
    clickPoint.current.style.display = "block";
  };
  return (
    <div className="w-full flex flex-col justify-content items-center m-auto">
      <div>
        <InstantSearch searchClient={searchClient} indexName="dev_posts">
          <SearchBox />
          <Hits hitComponent={Material} className="materials" />
        </InstantSearch>
      </div>
    </div>
  );
};

const CustomHighlight = connectHighlight(({ hit }) => {
  console.log(hit);
  return (
    <Link
      to={hit.link || "#"}
      className="flex flex-col dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border"
    >
      <img
        src={hit.thumbnail === "#" ? "/seduthumb.png" : hit.thumbnail}
        className="thumbnail aspect-video rounded-2xl"
      />
      <div className="flex items-center p-3 space-x-4">
        {/* <div to=''><img src={hit.authors[0].imageUrl || '/img/default.png'} className="w-12 block aspect-square rounded-full" /></div> */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{hit.title}</h3>
          <p className="text-sm text-gray-500">
            {hit?.type} {hit?.subject || "(null)"} {hit?.class}
          </p>
          {/* {info.authors.map((author, index) => (<p key={index} className="text-sm text-gray-500">{author.name}</p>))} */}
        </div>
      </div>
    </Link>
  );
});

const Material = ({ hit }) => {
  // console.log(hit);
  const author = hit.authors[0].author;
  const post = hit.post;
  // console.log(hit.path.substring(0, hit.path.indexOf("/")));
  const data = {
    title: post.Title,
    link:
      "/materials/token=" +
      post.Token,
    thumbnail: "#",
    type: post.Type,
    subject: post.Subject,
    class: post.Grade,
    author: {
      name: author.FirstName + " " + author.LastName,
      imageUrl: author.Avatar,
      profileUrl: "/user/id=" + author.id,
    },
  };
  // return gridData;
  return (
    <p>
      <CustomHighlight hit={data} />
    </p>
  );
};

export default Search;
