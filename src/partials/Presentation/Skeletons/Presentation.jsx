import * as FontAwesome from "react-icons/fa";

const PresentationSkeleton = () => (
  <div className="presentation flex-initial w-full animate-pulse">
    <div className="presentation__content flex-1 rounded-2xl m-3 md:m-0 md:ml-10 md:my-10">
      <div className="presentation__content-thumbnail rounded-2xl overflow-hidden aspect-[17/10] bg-gray-100 dark:bg-slate-900 dark:border-slate-800" />
      <div className="presentation__content-title flex items-center justify-between bg-gray-100 border dark:border-slate-800 dark:bg-slate-900 rounded-2xl p-3 mt-5">
        <div className="h-8 w-96 dark:bg-slate-800 rounded-full" />
        <div className="presentation__content-title-actions flex items-center space-x-3">
          <div className="presentation__content-title-action flex items-center space-x-2 dark:text-white bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-2 rounded-full pointer-events-none cursor-default">
            <FontAwesome.FaThumbsUp />
            <p className="user-select: none bg-gray-300 dark:bg-slate-700 rounded-full">
              ⠀
            </p>
          </div>
          <div
            id="dislike"
            className="presentation__content-title-action flex items-center space-x-2 dark:text-white bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-2 rounded-full pointer-events-none cursor-default"
          >
            <FontAwesome.FaThumbsDown />

            <p className="user-select: none bg-gray-300 dark:bg-slate-700 rounded-full">
              ⠀
            </p>
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="presentation__content-title-action flex items-center dark:text-white bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-3 rounded-full pointer-events-none cursor-default"
          >
            <FontAwesome.FaFileDownload />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default PresentationSkeleton;
