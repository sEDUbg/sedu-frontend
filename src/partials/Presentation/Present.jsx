import useFetch from 'react-fetch-hook';

import Presentation from '../../pages/Presentation';
import Author from './Author';
import Suggestions from './Suggestions';
import Comments from './Comments';

const Present = () => {
    const {data: presentation, loading, error} = useFetch("data/presentation.json");

    if (loading) return <div className="presentation__author bg-gray-100 dark:bg-slate-900 rounded-2xl p-5 dark:text-white divide-y dark:divide-slate-800 space-y-4 border dark:border-slate-800"><div>Loading...</div></div> 

    if (error) {
        return ( 
            <div className="presentation__author bg-gray-100 dark:bg-slate-900 rounded-2xl p-5 dark:text-white divide-y dark:divide-slate-800 space-y-4 border dark:border-slate-800">
                <div>
                    <p>Code: ${error.status}</p>
                    <p>Message: ${error.statusText}</p>
                </div>
            </div>
        )
    }
    return(
    <div className="md:flex">
        <div className='w-full h-full'>
            <Presentation title={presentation?.title} thumbnail={presentation?.thumbnail} link={presentation?.link}/>
            <Comments />
          </div>
          <div className='flex-initial md:w-1/5 m-3 md:m-10 space-y-5'>
            <Author presentation={presentation}/>
            <Suggestions />
          </div>
    </div>
)}

export default Present;