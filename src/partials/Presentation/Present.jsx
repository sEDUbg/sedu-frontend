import useFetch from 'react-fetch-hook';
import { Link, useParams } from "react-router-dom";

import Presentation from '../../pages/Presentation';
import Author from './Author';
import Suggestions from './Suggestions';
import Comments from './Comments';

// [TODO] Dynamically parce

const Present = () => {
    const { uuid } = useParams(); // ID to Presentation -> TBU for dynamic parsing
    const { data: presentation, loading, error } = useFetch("");

    if (loading) return <div className="presentation__author bg-gray-100 dark:bg-slate-900 rounded-2xl p-5 dark:text-white divide-y dark:divide-slate-800 space-y-4 border dark:border-slate-800"><div>Loading...</div></div>

    if (error) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex flex-col bg-gray-100 dark:bg-slate-900 rounded-2xl p-5 dark:text-white divide-y border dark:border-slate-800 space-y-5">
                    <p>грешка при зареждането</p>
                    <Link to="/" className="bg-gray-200 dark:bg-slate-800 rounded-2xl p-5 dark:text-white divide-y  border dark:border-slate-700">Назад</Link>
                </div>
            </div>
        )
    }
    return (
        <div className="flex md:flex-row flex-col">
            <div className='w-full h-full'>
                <Presentation title={presentation?.title} thumbnail={presentation?.thumbnail} link={presentation?.link} />
                <Comments />
            </div>
            <div className='flex-initial 2xl:w-1/5 lg:w-1/3 md:w-2/5 m-3 md:m-10 space-y-5'>
                <Author presentation={presentation} />
                <Suggestions />
            </div>
        </div>
    )
}

export default Present;