const Icon = ({ icon }) => ({ icon });

const Item = ({ title, description, icon }) => (
  <div className="features-item relative flex flex-col items-center p-6 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl">
    <Icon icon={icon} className="features-item-icon w-16 h-16 p-1 -mt-1 mb-2" />
    <div className="features-item-content">
      <h6 className="features-item-title text-xl font-bold leading-snug tracking-tight mb-1">
        {title}
      </h6>
      <p className="features-item-description text-gray-600 text-center">
        {description}
      </p>
    </div>
  </div>
);

export default Item;
