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

const Presentation = ({title, thumbnail}) => {
    return (
        <div className="presentation flex-initial w-full">
            <div className="presentation__content flex-1 rounded-2xl m-3 md:m-0 md:ml-10 md:my-10">
                <div className="presentation__content-thumbnail">
                    <img src={thumbnail} alt={title} className='rounded-2xl border dark:border-slate-800'/>
                </div>
                <div className="presentation__content-title bg-gray-100 border dark:border-slate-800 dark:bg-slate-900 rounded-2xl p-3 mt-5"><h2 className="dark:text-white text-left text-lg md:text-3xl text font-bold">{title}</h2></div>
                
            </div>
        </div>
    )
}

export default Presentation;