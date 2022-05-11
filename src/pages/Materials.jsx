import { Link } from 'react-router-dom'

// [TODO] - You know what to do

const info = {
    title: 'Ню Йорк сити',
    link: '/materials/uuid=[uuid]',
    thumbnail: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    type: "presentation",
    authors: [{name: "Kaloyan Doychinov", profileUrl: "https://sedubg.com/", imageUrl: "https://avatars.cloudflare.steamstatic.com/b4a5d7f1473151316410c1307822efd74ec5a87b_full.jpg/"},], // profileURL = https://sedubg.com/user/id=[id]
    keywords: 'Materials',
}

const Material = ({ info }) => {
    return (
        <Link to='' className="flex flex-col dark:black dark:hover:bg-slate-900 rounded-2xl cursor-pointer overflow-hidden">
            <img src={info.thumbnail} className="thumbnail aspect-video rounded-2xl"/>
            <div className="flex items-center p-3 space-x-4">
                <Link to=''><img src={info.authors[0].imageUrl} className="w-12 block aspect-square rounded-full" /></Link>
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold">{info.title}</h3>
                    {info.authors.map((author, index) => (<p key={index} className="text-sm text-gray-500">{author.name}</p>))}
                </div>
            </div>
        </Link>
    );
}

const Materials = ({ groupBy }) => {
    return (
        <div className="w-full flex flex-col justify-content items-center m-auto">
            <div className="materials w-11/12 lg:p-5 pt-5 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4 gap-y-6">
                {[...Array(12)].map((e, i) => (<Material key={i} info={info} />))}
            </div>
        </div>
    )
}

export default Materials;