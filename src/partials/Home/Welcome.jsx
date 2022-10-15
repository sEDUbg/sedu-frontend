const Welcome = () => {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-28 pb-12 md:pt-32 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              прави ученето{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                забавно
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                sedubg е платформа от ученици за ученици за споделяне на
                интересни учебни материали
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none flex sm:flex-row flex-col justify-center sm:space-x-4 sm:space-y-0 space-y-4"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <a
                  className="px-5 py-4 rounded-md dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700"
                  href="#plans"
                >
                  вижте плановете
                </a>
                <a
                  className="px-5 py-4 rounded-md dark:text-white dark:bg-slate-900 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800"
                  href="#0"
                >
                  научете повече
                </a>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div>
            <div
              className="relative flex justify-center mb-8"
              data-aos="zoom-y-out"
              data-aos-delay="450"
            >
              <div className="flex flex-col justify-center rounded-xl aspect-video w-screen sm:w-3/4">
                <iframe
                  className="rounded-xl aspect-video w-full"
                  src="https://www.youtube.com/embed/mwL1noMFx-E"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  fs="0"
                  modestbranding="1"
                ></iframe>
              </div>
              <a
                className="absolute top-full flex items-center transform -translate-y-1/2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full font-medium group p-4 shadow-lg"
                href="https://youtu.be/mwL1noMFx-E"
              >
                <svg
                  className="w-6 h-6 fill-current text-gray-400 group-hover:text-slate-300 flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                  <path d="M10 17l6-5-6-5z" />
                </svg>
                <span className="ml-3">гледайте в YouTube</span>
              </a>
            </div>

            {/* Modal */}
            {/* <Modal id="modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)}>
                    <div className="relative pb-9/16">
                        <iframe className="absolute w-full h-full" src="https://player.vimeo.com/video/174002812" title="Video" allowFullScreen></iframe>
                    </div>
        </Modal> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
