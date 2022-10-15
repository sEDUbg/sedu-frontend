import React, { useRef, useEffect, useState } from "react";

import Transition from "../../utils/Trans";

const Advantage = ({ text, checkmark }) => (
  <li className="flex items-center space-x-2">
    <p className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-200 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 font-black">
      {checkmark ? "✓" : "✕"}
    </p>
    <p className={checkmark ? "" : "dark:text-gray-500"}>{text}</p>
  </li>
);

const FREE_ADVANTAGES = [
  {
    text: "безплатни материали",
    checkmark: true,
  },
  {
    text: "безплатно качване",
    checkmark: true,
  },
  {
    text: "печелене на пари за план",
    checkmark: true,
  },
  {
    text: "3 материала на седмица",
    checkmark: false,
  },
  {
    text: "до 10MB качване",
    checkmark: false,
  },
  {
    text: "реклами",
    checkmark: false,
  },
];

const PREMIUM_ADVANTAGES = [
  {
    text: "безплатни материали",
    checkmark: true,
  },
  {
    text: "безплатно качване",
    checkmark: true,
  },
  {
    text: "печелене на пари",
    checkmark: true,
  },
  {
    text: " ∞ материали",
    checkmark: true,
  },
  {
    text: "до 200MB качване",
    checkmark: true,
  },
  {
    text: "свободно реклами",
    checkmark: true,
  },
];

const Plans = () => {
  return (
    <section className="relative" id="plans">
      <div className="relative flex flex-col items-center justify-center max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-8 md:pb-10">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
              планове
            </h2>
            <p className="text-xl text-gray-600">
              sEDUbg е изцяло безплатна платформа, но може да си избереш и план
              с различни удобства, които ще ти помогнат в твоето обучение
            </p>
          </div>
          </div>

          {/* Section content */}
            {/* Tabs items */}
        <div className="relative flex flex-col md:flex-row items-center justify-center md:space-x-6 space-y-6 md:space-y-0 w-full max-w-xl md:max-w-none">
          {/* Item 1 */}
          <div className="w-full p-6 relative flex flex-col bg-neutral-100 dark:bg-slate-900 rounded-xl items-center border border-neutral-200 dark:border-slate-800 space-y-4 divide-y divide-neutral-200 dark:divide-slate-800 shadow-md">
            <div className="w-full flex  items-center justify-center space-x-4">
              <img src="sedubg.png" alt="sedubg logo" className="w-14" />
              <h3 className="font-black text-4xl">безплатен</h3>
            </div>
            <div className="w-full flex flex-col pt-4 space-y-2">
              <p className="px-8 py-2 self-center rounded-3xl bg-neutral-200 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 text-xl font-black">
                0.00лв
              </p>
              <ul className="list-none list-inside text-left text-xl space-y-2">
                {FREE_ADVANTAGES.map((item) => (
                  <Advantage key={item.id} {...item} />
                ))}
              </ul>
            </div>
          </div>
          {/* Item 2 */}
          <div className="w-full p-6 relative flex flex-col bg-neutral-100 dark:bg-slate-900 rounded-xl items-center border border-neutral-200 dark:border-slate-800 space-y-4 divide-y divide-neutral-200 dark:divide-slate-800 shadow-md">
            <div className="w-full flex items-center justify-center space-x-4">
              <img src="sedubg.png" alt="sedubg logo" className="w-14" />
              <h3 className="font-black text-4xl">толкова про</h3>
            </div>
            <div className="w-full flex flex-col pt-4 space-y-2">
              <p className="px-8 py-2 self-center rounded-3xl bg-neutral-200 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 text-xl font-black">
                4.99лв
              </p>
              <ul className="list-none list-inside text-left text-xl space-y-2">
                {PREMIUM_ADVANTAGES.map((item) => (
                  <Advantage key={item.id} {...item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
