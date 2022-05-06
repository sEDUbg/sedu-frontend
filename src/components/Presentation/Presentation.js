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

const Presentation = ({ title, thumbnail , link}) => {
    useEffect(() => {console.log("YEAH", link)})
    if(link === undefined)
      return null;

    return (
      <div className="presentation flex-initial w-full">
        <div className="presentation__content flex-1 rounded-2xl m-3 md:m-0 md:ml-10 md:my-10">
          <div className="presentation__content-thumbnail">
            <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${"https://firebasestorage.googleapis.com/v0/b/sedubg-2022.appspot.com/o/Presentations%2FКриптиране.pptx?alt=media&token=ce2a3dc6-def2-4361-8bf9-e4ca056176d1"}`}
            title="slides"
            width="100%"
            height="600px"
            className="w-full"
          ></iframe>
          </div>
          <div className="presentation__content-title bg-gray-100 border dark:border-slate-800 dark:bg-slate-900 rounded-2xl p-3 mt-5">
            <h2 className="dark:text-white text-left text-lg md:text-3xl text font-bold">
              {title}
            </h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default Presentation;
