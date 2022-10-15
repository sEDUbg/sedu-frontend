import { Link, useParams } from "react-router-dom";

import Presentation from "./Presentation";
import Author from "./Author";
import Suggestions from "./Suggestions";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  increment,
} from "firebase/firestore";
import { app } from "../../utils/Firebase/firebase";
// [TODO] Dynamically parce

const Present = () => {
  const { type, uuid } = useParams(); // ID to Presentation -> TBU for dynamic parsing
  // const { data: presentation, loading, error } = useFetch("data/presentation.json");
  const [material, setMaterial] = useState({});
  const [author, setAuthor] = useState({});
  useEffect(async () => {
    const docRef = doc(getFirestore(app), type, uuid);
    await updateDoc(docRef, { "info.stats.views": increment(1) });
    //console.log(uuid)
    const mat = await getDoc(doc(getFirestore(app), type, uuid));
    //console.log(mat.data().title, mat.data().thumbnail, mat.data().file)
    setMaterial(mat.data());
    const authorDoc = await getDoc(
      doc(getFirestore(app), "StripeCustomers", mat.data().Author.id)
    );
    //console.log(authorDoc.data())
    setAuthor(authorDoc.data());
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex md:flex-row flex-col w-full max-w-screen-2xl">
        <div className="w-full h-full">
          <Presentation
            title={material?.title}
            type={type}
            link={material?.file}
            uuid={uuid}
          />
          <Comments />
        </div>
        <div className="flex-initial 2xl:w-1/5 lg:w-1/3 md:w-1/4 m-3 md:m-10 space-y-5">
          <Author presentation={material} author={author} type={type} />
          {/* <Suggestions /> */}
        </div>
      </div>
    </div>
  );
};

export default Present;
