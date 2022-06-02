import { collection, getDoc, getDocs, onSnapshot, orderBy, query, where, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app } from '../utils/Firebase/firebase';
import { Link } from 'react-router-dom'

// [TODO] - You know what to do

const getAuthor = async (uid) => {
    const author = await getDoc(doc(getFirestore(app), 'StripeCustomers', uid));
    if (author.exists()) {
        return author.data();
    }
    return null;
}

/* const NEWgetAuthor = (uid) => {
    return new Promise((resolve, reject) => {
        const author = getDoc(doc(getFirestore(app), 'StripeCustomers', uid));

        if (author.exists()) resolve(author.data());
        else reject(Error(null));
    });
};

const getGrid = async (type) => {
    const grid = await getDocs(collection(getFirestore(app), type));
    const promises = grid?.docs.map(item => getAuthor(item.data().Author.id));
    const authors = await Promise.all(promises);
    const gridData = authors.map(author => {
        //console.log(item.data());
      return {
          title: item.data().title,
          link: "/materials/type=" + type + "/uuid=" + item.id,
          thumbnail: "#",
          type: type,
          authors: [{
            name: author.FirstName + " " + author.LastName,
            imageUrl: author.profileUrl,
            profileUrl: "/user/id=" + author.id
          }]
      }
    });
    return gridData;
} */

const OLDgetGrid = async (type) => {
    const grid = await getDocs(collection(getFirestore(app), type));

    const promisesA = grid?.docs.map(item => getAuthor(item.data().Author.id));
    const authors = await Promise.all(promisesA);
    let i = 0; // Най-C-яджийският начин да се направи
    const promises = grid?.docs.map(item => {
        const author = authors[i++]; // буквално, ще бъде направено със Promises, ама не сега + това работи
        console.log(author);
        return {
            title: item.data().title,
            link: "/materials/type=" + type + "/uuid=" + item.id,
            thumbnail: "#",
            type: type,
            authors: [{
                name: author.FirstName + " " + author.LastName,
                imageUrl: author.profileUrl,
                profileUrl: "/user/id=" + author.id
            }]
        }
    });
    const gridData = await Promise.all(promises); 
    return gridData;
}

const Material = ({ info }) => {
    // console.log(info)
    return (
        <Link to={info.link || '#'} className="flex flex-col dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border">
            <img src={info.thumbnail === '#' ? '/seduthumb.png' : info.thumbnail} className="thumbnail aspect-video rounded-2xl" />
            <div className="flex items-center p-3 space-x-4">
                <div to=''><img src={info.authors[0].imageUrl || '/img/default.png'} className="w-12 block aspect-square rounded-full" /></div>
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold">{info.title}</h3>
                    {info.authors.map((author, index) => (<p key={index} className="text-sm text-gray-500">{author.name}</p>))}
                </div>
            </div>
        </Link>
    );
}

const Materials = ({ groupBy }) => {
    const [grid, setGrid] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        OLDgetGrid(groupBy)
            .then(grid => {
                setGrid(grid);
            })
            .then(() => setLoading(false));
            //.then(setTimeout(function() { setLoading(false); }, 1000000));

    }, [groupBy]);

    if(loading) {
        return (
            <div className="flex flex-col items-center justify-center m-auto h-[80vh]">
                <svg role="status" className="w-36 h-36 mr-2 text-gray-200 animate-spin dark:text-[#0F172A] fill-gray-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                </svg>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col justify-content items-center m-auto">
            <div className="materials w-11/12 lg:p-5 pt-5 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4 gap-y-6">
                {grid.length > 0 ? grid.map((info) => (<Material key={info.link} info={info} />)) : <div className="w-full flex flex-col justify-content items-center m-auto"> <h1 className="text-xl font-bold">Няма намерени материали</h1> </div>}
            </div>
        </div>
    )
}

export default Materials;