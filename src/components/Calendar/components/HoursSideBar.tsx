import { generateHours } from "../helpers";

const HoursSideBar = () => {
  return (
    <div className="w-16 mt-10 flex flex-col">
      {generateHours().map((hour, index) => (
        <div
          key={index}
          className="flex items-start h-24 text-sm text-gray-500"
        >
          {hour}
        </div>
      ))}
    </div>
  );
};

export default HoursSideBar;
