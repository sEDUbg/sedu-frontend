/* const presentation = {
    author: {
      name: 'Калоян Дойчинов',
      imageUrl: 'https://avatars.cloudflare.steamstatic.com/b4a5d7f1473151316410c1307822efd74ec5a87b_full.jpg',
      bio: 'Програмист в компании Седубг',
      class: '10',
      school: 'ТУЕС',
    },
    title: 'Съединените американски щати',
    thubnail: 'present.png',
} */

import { useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import * as FontAwesome from 'react-icons/fa'

const Presentation = ({ title, type, link, likes, dislikes }) => {
  // useEffect(() => { const user = createPromoCode(); console.log(user) })
  let fileType = String(link).split('.').pop();

  // to be replaced with dictionary
  // console.log(String(link).split('.').pop())

  const docs = [
    {
      uri: link,
      fileType: fileType,
    }
  ];

  const docs_conf = {
    header: {
      disableHeader: true,
      disableFileName: true,
    },
  };
  if (link === undefined)
    return null;

  return (
    <div className="presentation flex-initial w-full">
      <div className="presentation__content flex-1 rounded-2xl m-3 md:m-0 md:ml-10 md:my-10">
        <div className="presentation__content-thumbnail rounded-2xl overflow-hidden aspect-[17/10] bg-gray-100 dark:bg-slate-900 dark:border-slate-800">
          <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} config={docs_conf} className="rounded-2xl aspect-[17/10]" />
        </div>
        <div className="presentation__content-title flex items-center justify-between bg-gray-100 border dark:border-slate-800 dark:bg-slate-900 rounded-2xl p-3 mt-5">
          <h2 className="dark:text-white text-left text-lg md:text-3xl text font-black">
            {title}
          </h2>
          <div className="presentation__content-title-actions flex items-center space-x-3">
            <div className="presentation__content-title-action flex items-center space-x-2 dark:text-white bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-2 rounded-full cursor-pointer"><FontAwesome.FaThumbsUp /><p>{likes || '0'}</p></div>
            <div className="presentation__content-title-action flex items-center space-x-2 dark:text-white bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-2 rounded-full cursor-pointer"><FontAwesome.FaThumbsDown /><p>{dislikes || '0'}</p></div>
            <a href={link} target="_blank" rel="noopener noreferrer" className="presentation__content-title-action flex items-center dark:text-white bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-3 rounded-full"><FontAwesome.FaFileDownload /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
