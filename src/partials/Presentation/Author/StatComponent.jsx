import {
  FaRegEye,
  FaRegThumbsUp,
  FaRegCommentAlt,
  FaRegArrowAltCircleDown,
  FaCodeBranch,
} from "react-icons/fa";

const STATS = {
  views: <FaRegEye />,
  likes: <FaRegThumbsUp />,
  comments: <FaRegCommentAlt />,
  downloads: <FaRegArrowAltCircleDown />,
  forks: <FaCodeBranch />,
};

const StatComponent = ({ type, data }) => (
  <div className="flex items-center space-x-2">
    {STATS[type]}
    <p>{data}</p>
  </div>
);

export default StatComponent;
