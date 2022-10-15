import * as FontAwesome from "react-icons/fa";
import React from "react";

const Item = ({ title, description, icon }) => {
  return (
    <div className="relative flex flex-col items-center p-6 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-md">
      <div className="text-3xl text-gray-600 dark:text-gray-300 rounded-full dark:bg-slate-900 border dark:border-slate-700 p-2 mb-2">
        {icon}
      </div>
      <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
        {title}
      </h4>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const Important = ({ text }) => (
  <strong className="text-gray-700 dark:text-gray-300">{text}</strong>
);

const Features = () => {
  const features = [
    {
      title: "от ученици за ученици",
      description:
        "sEDUbg е платфома за споделяне на училищни материали, създадена от ентусиазирани ученици за ученици",
      icon: <FontAwesome.FaUserFriends />,
    },
    {
      title: "споделяне на материали",
      description:
        "Чрез sEDUbg можеш да споделяш и да търсиш училищни материали, които са създадени от други ученици",
      icon: <FontAwesome.FaShare />,
    },
    {
      title: "оценяване на материали",
      description:
        "Чрез оценяването се подобрява качеството на материалите и може да получиш ползотворна обратна връзка",
      icon: <FontAwesome.FaBalanceScaleLeft />,
    },
    {
      title: "усъвършенстване",
      description:
        "Може да се себеусъвършенстваш, докато създаваш и гледаш други материали, интересни за теб",
      icon: <FontAwesome.FaAngleDoubleUp />,
    },
    {
      title: "обратна връзка",
      description:
        "Като споделяш материали, можеш да получиш обратна връзка както от други ученици, така и от учители",
      icon: <FontAwesome.FaComments />,
    },
    {
      title: "ексклузивно съдържание",
      description:
        "Платформата е изпълнена с екслузивно авторско съдържание от нас и от други ученици",
      icon: <FontAwesome.FaStar />,
    },
  ];

  return (
    <section id="how-it-works" className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-50 dark:bg-gray-900 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 dark:bg-slate-800 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
              как работи?
            </h2>
            <p className="text-xl text-gray-600">
              <Important text="sEDUbg" /> е изключително{" "}
              <Important text="лесна" /> за изполване платформа, която помага на{" "}
              <Important text="учениците" /> да споделят своите{" "}
              <Important text="знания" /> и <Important text="умения" /> с други
              ученици
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-strech md:max-w-2xl lg:max-w-none">
            {features.map((item, index) => (
              <Item key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
