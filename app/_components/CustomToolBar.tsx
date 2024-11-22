import { useState, useEffect } from "react";
import { CalendarButtonLeft, CalendarButtonRight } from "./CalendarButtons";

const CustomToolbar = ({ onNavigate, onView, date }: any) => {
  // State to hold the formatted current month and year
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const [selectedView, setSelectedView] = useState<string>("week");

  useEffect(() => {
    // Format the current month and year (e.g., "November 2024")
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    setCurrentMonthYear(`${month} ${year}`);
  }, [date]);

  const handleViewChange = (view: string) => {
    setSelectedView(view);
    onView(view);
  };

  return (
    <div className="custom-toolbar flex justify-between items-center mb-2">
      <div className="flex gap-4">
        <CalendarButtonLeft onClick={() => onNavigate("PREV")} />
        <CalendarButtonRight onClick={() => onNavigate("NEXT")} />
        <div className="flex justify-between items-center month-year text-lg font-semibold text-black">
          {currentMonthYear}
        </div>
      </div>

      <div className="view-buttons">
        <button
          className={`border border-[#D9D9D9]  rounded-l p-2 ${
            selectedView === "week"
              ? " border border-[#695EDA] text-[#695EDA]"
              : "text-black"
          }`}
          onClick={() => handleViewChange("week")}
        >
          Week
        </button>
        <button
          className={`border border-[#D9D9D9]  p-2 ${
            selectedView === "day"
              ? " border border-[#695EDA] text-[#695EDA]"
              : "text-black border-l-0"
          }`}
          onClick={() => handleViewChange("day")}
        >
          Day
        </button>
        <button
          className={`border border-[#D9D9D9]  rounded-r p-2 ${
            selectedView === "list"
              ? " border border-[#695EDA] text-[#695EDA]"
              : "text-black border-l-0"
          }`}
          onClick={() => handleViewChange("list")}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
