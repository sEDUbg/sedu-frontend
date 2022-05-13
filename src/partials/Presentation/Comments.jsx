import Comment from './Comment'
import * as FontAwesome from 'react-icons/fa'

const comments = [
    {
        id: 1,
        name: "Калоян Дойчинов",
        avatar: 'https://avatars.cloudflare.steamstatic.com/b4a5d7f1473151316410c1307822efd74ec5a87b_full.jpg',
        comment: "очаквайте коментари скоро",
        date: "Вчера, 14:00"
    },
]

const Comments = () => {
  return (
    <div className="comments dark:text-white m-3 md:m-0 md:ml-10 bg-gray-100 border border-gray-200 dark:border-slate-800 dark:bg-slate-900 rounded-2xl p-5 mb-5 space-y-5">
      <div className="flex justify-between items-center">
        <h3 className='font-bold text-xl'>Коментари</h3>
        <div className="dark:text-white flex bg-gray-200 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 p-2 rounded-full">
          <FontAwesome.FaArrowDown className=""/>
        </div>
      </div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments;