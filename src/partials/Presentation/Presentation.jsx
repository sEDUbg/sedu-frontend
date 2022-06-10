import { getDoc, doc, getFirestore, updateDoc, increment } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import * as FontAwesome from 'react-icons/fa'
import { app } from '../../utils/Firebase/firebase';

const Presentation = ({ title, type, uuid, link }) => {
  // useEffect(() => { const user = createPromoCode(); console.log(user) })
  let fileType = String(link).split('.').pop();
  const docRef = doc(getFirestore(app), type, uuid);
  const userId = sessionStorage.getItem('User ID').toString();
  const [load, setLoad] = useState(false);
  const [reaction, setReaction] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  useEffect(() => {

    if (load) {
      var reactNum = 0;
      if (reaction == 'like') {
        reactNum++;
      } else if (reaction == 'dislike') {
        reactNum--;
      }
      const arrayLoc = "info.stats.responseList." + userId;
      var likeNum = 0;
      var dislikeNum = 0;



      var docValue = {};
      docValue[arrayLoc.toString()] = reactNum;
      console.log(docValue, reaction);
      updateDoc(docRef, docValue).then(() => {
        getDoc(docRef).then(doc => {
          const arr = doc.data().info.stats.responseList;
          if (arr) {
            for (var key in arr) {
              if (arr[key] == 1) {
                likeNum++;
              } else if (arr[key] == -1) {
                dislikeNum++;
              }
            }
          }


          const LikeLoc = "info.stats.likes";
          const DislikeLoc = "info.stats.dislikes";
          var docValues = {};
          docValues[LikeLoc.toString()] = likeNum;
          docValues[DislikeLoc.toString()] = dislikeNum;
          setLikes(likeNum);
          setDislikes(dislikeNum);
          console.log(docValues);
          updateDoc(docRef, docValues);
        })
      })
    }
  }, [reaction])
  useEffect(() => {
    getDoc(docRef).then(doc => {
      const arr = doc.data().info.stats?.responseList;
      if (arr != undefined) {
        if (userId in arr) {
          setReaction(arr[userId] == 1 ? 'like' : arr[userId] == -1 ? 'dislike' : '');
        }
      }
      setLikes(doc.data().info.stats?.likes);
      setDislikes(doc.data().info.stats?.dislikes);
      setLoad(true);
    })
  }, [])
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

  const Reaction = (inReact) => {
    // console.log(kids)
    if (reaction != inReact) {
      setReaction(inReact);
    } else if (reaction != 'dislike' && reaction != 'like') {
      setReaction(inReact);
    } else {
      setReaction('');
    }
  }



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
            <div onClick={() => Reaction("like")} id="like" className="presentation__content-title-action flex items-center space-x-2 dark:text-white bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-2 rounded-full cursor-pointer">{reaction == "like" ? <FontAwesome.FaThumbsUp /> : <FontAwesome.FaRegThumbsUp />}<p className='user-select: none'>{likes || '0'}</p></div>
            <div onClick={() => Reaction("dislike")} id="dislike" className="presentation__content-title-action flex items-center space-x-2 dark:text-white bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-2 rounded-full cursor-pointer">{reaction == "dislike" ? <FontAwesome.FaThumbsDown /> : <FontAwesome.FaRegThumbsDown />}<p className='user-select: none'>{dislikes || '0'}</p></div>
            <a onClick={() => updateDoc(docRef, { "info.stats.downloads": increment(1) })} href={link} target="_blank" rel="noopener noreferrer" className="presentation__content-title-action flex items-center dark:text-white bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-3 rounded-full"><FontAwesome.FaFileDownload /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
