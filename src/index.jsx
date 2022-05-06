import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {   
  KBarProvider, 
  KBarPortal, 
  KBarPositioner, 
  KBarAnimator, 
  KBarSearch, 
  KBarResults  
} from "kbar";

const actions = [
  {
    id: "blog",
    name: "Blog",
    shortcut: ["b"],
    keywords: "writing words",
    perform: () => (window.location.pathname = "upload"),
  },
  {
    id: "contact",
    name: "Contact",
    shortcut: ["c"],
    keywords: "email",
    perform: () => (window.location.pathname = "/"),
  },
];

function Render({ action, handlers, state }) {
  const ownRef = React.useRef < HTMLDivElement > null;
  const active = state.index === state.activeIndex;
  React.useEffect(() => {
    if (active) {
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          const element = ownRef.current;
          if (!element) {
            return;
          }
          // @ts-ignore
          element.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
            inline: "start",
          });
        })
      );
    }
  }, [active]);

  return (
    <div
      className={`p-6 flex items-center justify-between cursor-pointer transition-all transform text-sm font-semibold ${
        active
          ? "bg-orange-50/80 dark:bg-orange-900 dark:bg-opacity-40 text-draplin dark:text-white"
          : "bg-white dark:bg-blackish text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-black"
      }`}
      // ref={ownRef}
      // {...handlers}
    >
      <span>{action.name}</span>
      {action.shortcut?.length ? (
        <div className='flex'>
          {action.shortcut.map((sc) => (
            <kbd
              key={sc}
              className='py-0.5 px-2 bg-gray-50 dark:bg-blackish border border-gray-200 dark:border-gray-800 text-code font-semibold rounded'
            >
              {sc}
            </kbd>
          ))}
        </div>
      ) : null}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className='fixed inset-0 bg-blackish bg-opacity-30 dark:bg-opacity-60 z-50'>
            <KBarAnimator className='w-4/5 sm:w-2/5 overflow-auto transition-all transform bg-white dark:bg-blackish shadow-hard dark:shadow-dark rounded-lg border border-gray-200 dark:border-gray-800'>
              <KBarSearch
                className='box-border	outline-none p-6 border-b border-gray-100 dark:border-gray-800 w-full bg-white dark:bg-blackish dark:text-gray-200'
                placeholder='Search…'
              />
              <KBarResults
                className='h-2/5	overflow-auto'
                onRender={(action, handlers, state) => (
                  <Render action={action} handlers={handlers} state={state} />
                )}
              />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <App />
      </KBarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
