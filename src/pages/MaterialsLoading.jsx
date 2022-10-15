const MaterialsLoading = ({ limit }) => {
  return (
    <div className="w-full flex flex-col justify-content items-center m-auto transition ease-in-out delay-150">
      <div className="materials animate-pulse w-11/12 lg:p-5 pt-5 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4 gap-y-6">
        {Array.from({ length: limit }, (_, index) => (
          <div className="flex flex-col dark:black rounded-2xl overflow-hidden box-border">
            <div className=" w-full h-full thumbnail aspect-video rounded-2xl bg-slate-900" />
            <div className="flex items-center p-3 space-x-4">
              <div className="w-12 h-12 block aspect-square rounded-full dark:bg-slate-900" />
              <div className="flex flex-col flex-grow-1">
                <div className="h-7 w-full py-1">
                  <div className="h-full rounded-full dark:bg-slate-900" />
                </div>
                <div className="h-5 w-56 py-1">
                  <div className="h-full rounded-full dark:bg-slate-900" />
                </div>
                <div className="h-5 w-28 py-1">
                  <div className="h-full rounded-full dark:bg-slate-900" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialsLoading;
