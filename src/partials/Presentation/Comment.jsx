const Comment = ({ comment }) => {
    return (
        <div className="comment text-white flex bg-gray-200 border dark:border-slate-700 dark:bg-slate-800 rounded-2xl p-3 space-x-5">
            <img src={comment.avatar} className="comment__avatar h-16 rounded-full" alt="avatar" />
            <div>
                <div className="comment__avatar flex items-center space-x-2 divide-x">
                    <p className="comment__name text-sm">{comment.name}</p>
                    <p className="comment__date text-xs pl-2">{comment.date}</p>
                </div>
                <div className="comment__content">
                    <div className="comment__text">{comment.comment}</div>
                </div>
            </div>
        </div>
    );
}

export default Comment;