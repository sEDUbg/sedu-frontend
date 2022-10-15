import SpecsComponent from "./SpecsComponents";

const TYPE = {
  Pictures: "материал",
  Videos: "видео",
  Presentations: "презентация",
  Documents: "документ",
  Audio: "аудио",
  Other: "материал",
};

const Specs = ({ subject, grade, type }) => {
  const specs = [
    {
      name: "subject",
      data: subject,
    },
    {
      name: "class",
      data: grade + " клас",
    },
    {
      name: "type",
      data: TYPE[type],
    },
  ];

  return (
    <div className="specs pt-4">
      {specs.map((spec, index) => (
        <SpecsComponent key={index} type={spec.name} data={spec.data} />
      ))}
    </div>
  );
};

export default Specs;
