// [TODO] Add dynamic suggestions

const suggestions = [
    {title: 'Ню Йорк сити', url: '#', thubnail: 'seduthumb.png', authors: ['Калоян Дойчинов и ', 'Алеко Георгиев']},
    {title: 'Ню Йорк сити', url: '#', thubnail: 'seduthumb.png', authors: ['Калоян Дойчинов и ', 'Алеко Георгиев']},
    {title: 'Ню Йорк сити', url: '#', thubnail: 'seduthumb.png', authors: ['Калоян Дойчинов и ', 'Алеко Георгиев']},
    {title: 'Ню Йорк сити', url: '#', thubnail: 'seduthumb.png', authors: ['Калоян Дойчинов и ', 'Алеко Георгиев']},
    {title: 'Ню Йорк сити', url: '#', thubnail: 'seduthumb.png', authors: ['Калоян Дойчинов и ', 'Алеко Георгиев']},
]

const s_items = suggestions.map((suggestion) => 
    <div className="flex items-center pt-2"> 
        <img src={suggestion.thubnail} className="h-14 mr-5 rounded-lg border dark:border-slate-800" alt=""/>
        <div className="">
            <p>{suggestion.title}</p>
            <p className="text-xs">{suggestion.authors}</p>
        </div>
    </div>
 );

const Suggestions = () => {
    return (
        <div className="suggestions bg-gray-100 dark:bg-slate-900 rounded-2xl p-5 pt-3 dark:text-white divide-y dark:divide-slate-800 space-y-2 border dark:border-slate-800">
            {s_items}
        </div>
    );
}

export default Suggestions;