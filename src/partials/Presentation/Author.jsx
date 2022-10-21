import { useEffect } from "react";

import AuthorSkeleton from "./Skeletons/Author";
import Specs from "./Author/Specs";
import Stats from "./Author/Stats";

const Author = ({ presentation, author, type }) => {
  useEffect(() => {
    console.log(presentation);
  }, [presentation]);

  if (!author?.FirstName) return <AuthorSkeleton />;

  return (
    <div className="presentation__author bg-gray-100 dark:bg-slate-900 rounded-2xl p-5 dark:text-white divide-y dark:divide-slate-800 space-y-4 border dark:border-slate-800">
      <div className="flex space-x-4 items-center">
        <img
          className="flex-initial w-24 rounded-full border dark:border-slate-800 aspect-square"
          src={author.profileUrl || "/img/default.png"}
          alt={author.Username}
        />
        <div className="flex-initial presentation__author-info space-y-4">
          <div>
            <div className="presentation__author-name font-black text-lg">
              <h3>{author.FirstName + " " + author.LastName}</h3>
            </div>
            <div className="presentation__author-class font-light text-xs">
              ученик в {author.class} клас, {author.school}
            </div>
          </div>
          <div className="presentation__author-bio text-sm">{author.bio}</div>
        </div>
      </div>
      <div className="divide-y space-y-4 dark:divide-slate-800">
        <div className="presentation__author-bio pt-4">
          {presentation?.info?.description}
        </div>
        <Specs
          subject={presentation?.info?.specs?.subject}
          grade={presentation?.info?.specs?.class}
          type={type}
        />
        <Stats {...presentation?.info?.stats} />
      </div>
    </div>
  );
};

export default Author;
