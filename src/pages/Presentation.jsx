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

const Presentation = ({ title, thumbnail, link }) => {
  useEffect(() => { console.log("YEAH", link) })
  const docs = [
    {
      uri: "https://firebasestorage.googleapis.com/v0/b/sedubg-2022.appspot.com/o/Presentations%2FSmart_Coffee_Machine%20(1).pptx?alt=media&token=ef4438a7-4045-4e76-8c33-7908e527c0f8",
      fileType: "pptx",
    }
  ]
  if (link === undefined)
    return null;

  return (
    <div className="presentation flex-initial w-full">
      <div className="presentation__content flex-1 rounded-2xl m-3 md:m-0 md:ml-10 md:my-10">
        <div className="presentation__content-thumbnail">
          <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
        </div>
        <div className="presentation__content-title flex item-center justify-between bg-gray-100 border dark:border-slate-800 dark:bg-slate-900 rounded-2xl p-3 mt-5">
          <h2 className="dark:text-white text-left text-lg md:text-3xl text font-bold">
            {title}
          </h2>
          <div className="presentation__content-title-actions flex items-center">
            <div></div>
            <a href={link} target="_blank" rel="noopener noreferrer" className="presentation__content-title-action flex items-center text-white bg-gray-200 border dark:border-slate-700 dark:bg-slate-800 p-2 rounded-full"><FontAwesome.FaFileDownload /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
