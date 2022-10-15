import StatComponent from "./StatComponent";

const Stats = ({ views, likes, dislikes, comments, downloads, forks }) => {
  const stats = [
    {
      name: "views",
      data: views,
    },
    {
      name: "likes",
      data:
        likes >= 0
          ? Math.round((likes / (likes + dislikes)) * 100).toString() + "%"
          : "0",
    },
    {
      name: "comments",
      data: comments,
    },
    {
      name: "downloads",
      data: downloads,
    },
    {
      name: "forks",
      data: forks,
    },
  ];

  return (
    <div className="stats flex lg:flex-nowrap flex-wrap space-x-4 pt-4">
      {stats.map((stat, index) => (
        <StatComponent key={index} type={stat.name} data={stat.data} />
      ))}
    </div>
  );
};

export default Stats;
