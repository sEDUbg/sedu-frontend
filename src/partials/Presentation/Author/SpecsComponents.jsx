import {
  FaRegNewspaper,
  FaRegClock,
  FaRegFilePowerpoint,
} from "react-icons/fa";

const STATS = {
  subject: <FaRegNewspaper />,
  class: <FaRegClock />,
  type: <FaRegFilePowerpoint />,
};

const SpecsComponent = ({ type, data }) => (
  <div className="flex items-center space-x-2">
    {STATS[type]}
    <p>{data}</p>
  </div>
);

export default SpecsComponent;
