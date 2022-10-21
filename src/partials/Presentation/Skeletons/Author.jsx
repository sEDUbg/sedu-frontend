const AuthorSkeleton = () => (
  <div className="presentation__author bg-gray-100 dark:bg-slate-900 rounded-2xl p-5 dark:text-white divide-y dark:divide-slate-800 space-y-4 border dark:border-slate-800 animate-pulse">
    <div className="flex space-x-4 items-center">
      <div className="grow w-24 h-24 aspect-square rounded-full border bg-gray-300 dark:bg-slate-800 dark:border-slate-800" />
      <div className="presentation__author-info space-y-4 w-full">
        <div className="w-full">
          <div className="presentation__author-name h-7 w-full py-1">
            <div className="h-full w-full bg-gray-300 dark:bg-slate-800 rounded-full" />
          </div>
          <div className="presentation__author-class h-4 w-2/3 pt-1">
            <div className="h-full w-full bg-gray-300 dark:bg-slate-800 rounded-full" />
          </div>
        </div>
        <div className="presentation__author-bio h-5 bg-gray-300 dark:bg-slate-800 rounded-full">
          {}
        </div>
      </div>
    </div>
    <div className="divide-y space-y-4 dark:divide-slate-800">
      <div className="presentation__author-bio pt-4 space-y-2">
        <div className="h-5 bg-gray-300 dark:bg-slate-800 rounded-full" />
        <div className="h-5 bg-gray-300 dark:bg-slate-800 rounded-full" />
        <div className="h-5 w-1/2 bg-gray-300 dark:bg-slate-800 rounded-full" />
      </div>
      <div className="specs pt-4">
        {Array.from({ length: 3 }, (_, index) => (
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 p-1">
              <div className="h-full w-full bg-gray-300 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="h-6 w-1/2 py-1">
              <div className="h-full w-full bg-gray-300 dark:bg-slate-800 rounded-full" />
            </div>
          </div>
        ))}
      </div>
      <div className="stats flex lg:flex-nowrap flex-wrap space-x-4 pt-4">
        {Array.from({ length: 5 }, (_, index) => (
          <div className="flex items-center">
            <div className="h-6 w-6 p-1">
              <div className="h-full w-full bg-gray-300 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="h-6 w-6 py-1">
              <div className="h-full w-full bg-gray-300 dark:bg-slate-800 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AuthorSkeleton;