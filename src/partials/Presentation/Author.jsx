import { useEffect } from 'react';
import * as FontAwesome from 'react-icons/fa'

const Author = ({ presentation, author, type }) => {

    useEffect(() => {
        console.log(presentation?.info?.stats.likes + ' likes');
    })

    return (
        <div className="presentation__author bg-gray-100 dark:bg-slate-900 rounded-2xl p-5 dark:text-white divide-y dark:divide-slate-800 space-y-4 border dark:border-slate-800">
            <div className='flex space-x-4 items-center'>
                <img className="flex-initial w-1/3 rounded-full border dark:border-slate-800 aspect-square" src={author.profileUrl || '/img/default.png'} alt={author.Username} />
                <div className="flex-initial presentation__author-info space-y-4">
                    <div>
                        <div className="presentation__author-name font-black text-lg"><h3>{author.FirstName + " " + author.LastName}</h3></div>
                        <div className="presentation__author-class font-light text-xs">ученик в {author.class} клас, {author.school}</div>
                    </div>
                    <div className="presentation__author-bio text-sm">{author.bio}</div>
                </div>
            </div>
            <div className="divide-y space-y-4 dark:divide-slate-800">
                <div className="presentation__author-bio pt-4">{presentation?.info?.description}</div>
                <div className="specs pt-4">
                    <div className="flex items-center space-x-2"><FontAwesome.FaRegNewspaper /><p>{presentation?.info?.specs.subject}</p></div>
                    <div className="flex items-center space-x-2"><FontAwesome.FaRegClock /><p>{presentation?.info?.specs.class} клас</p></div>
                    <div className="flex items-center space-x-2"><FontAwesome.FaRegFilePowerpoint /><p>{type}</p></div>
                </div>
                <div className="stats flex space-x-4 pt-4">
                    <div className="flex items-center space-x-2"><FontAwesome.FaRegEye /><p>{presentation?.info?.stats.views}</p></div>
                    <div className="flex items-center space-x-2"><FontAwesome.FaRegThumbsUp /> <p>{presentation?.info?.stats.likes >= 0 ? (Math.round(presentation?.info?.stats.likes / (presentation?.info?.stats.likes + presentation?.info?.stats.dislikes) * 100)).toString() + '%' : '0'}</p></div>
                    <div className="flex items-center space-x-2"><FontAwesome.FaRegCommentAlt /><p>{presentation?.info?.stats.comments}</p></div>
                    <div className="flex items-center space-x-2"><FontAwesome.FaRegArrowAltCircleDown /><p>{presentation?.info?.stats.downloads}</p></div>
                    <div className="flex items-center space-x-2"><FontAwesome.FaCodeBranch /><p>{presentation?.info?.stats.forks}</p></div>
                </div>
            </div>
        </div>
    )
}

export default Author;