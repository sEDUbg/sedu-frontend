import { Link } from "react-router-dom";
import * as FontAwesome from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="w-full flex item-center justify-center max-w-6xl mx-auto px-4 sm:px-6 my-8">
        <div className="w-full md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200 dark:border-slate-800">
          <ul className="flex items-center justify-center mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <a
                href="https://instagram.com/sedubg"
                className="flex justify-center w-8 h-8 items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-white dark:bg-slate-900 hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Instagram"
              >
                <FontAwesome.FaInstagram aria-label="Instagram" />
              </a>
            </li>
            <li className="ml-4">
              <a
                href="https://github.com/sedubg"
                className="flex justify-center w-8 h-8 items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-white dark:bg-slate-900 hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Github"
              >
                <FontAwesome.FaGithub aria-label="Github" />
              </a>
            </li>
            <li className="ml-4">
              <a
                href="https://facebook.com/sedubg"
                className="flex justify-center w-8 h-8 items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-white dark:bg-slate-900 hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Facebook"
              >
                <FontAwesome.FaFacebook aria-label="Facebook" />
              </a>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="flex items-center justify-center space-x-2">
            <Link to="/" className="inline-block" aria-label="Cruip">
              <img className="w-8 h-8" src="sedubg.png" />
            </Link>
            <h1 className="font-black">
              sEDUbg<sup className="text-sm text-gray-600">®</sup>
            </h1>
            <div className="text-sm text-gray-600 mr-4">
              всички права са запазени
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
