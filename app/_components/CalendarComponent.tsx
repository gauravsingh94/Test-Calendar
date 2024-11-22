import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CustomToolbar from "./CustomToolBar";
import "./custom-calendar-styles.scss"; // Import the custom styles

export type EventType = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  colorEvento: string;
  color: string;
  description: string;
};

// Localizer for React Big Calendar
const localizer = momentLocalizer(moment);

// Event data (unchanged)
// Event data (updated with 10 events for Nov and Dec)

// Function to apply custom styles to the current day
const calendarStyle = (date: Date) => {
  const currentDate = `${new Date().getDate()} ${
    new Date().getMonth() + 1
  } ${new Date().getFullYear()}`;
  const allDate = `${date.getDate()} ${
    date.getMonth() + 1
  } ${date.getFullYear()}`;

  // Check if the date matches the current date and apply custom styles
  if (allDate === currentDate) {
    return {
      style: {
        backgroundColor: "#F1F0FE", // Purple background
        color: "white", // White text color for contrast
      },
    };
  }

  // Return null if no custom style is needed
  return {};
};

export default function EventCalendar({ events }: { events: EventType[] }) {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  return (
    <div className="w-full">
      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
        eventPropGetter={(event) => {
          const backgroundColor = event.colorEvento || "#0000FF";
          const color = event.color || "#000000";
          const border = "none";
          return { style: { backgroundColor, color, border } };
        }}
        dayPropGetter={(date) => calendarStyle(date)}
        views={["week", "day"]}
        defaultView="week"
        components={{
          toolbar: CustomToolbar, // Use the custom toolbar
        }}
      />

      {/* Display Event Details if an event is selected */}
      {selectedEvent && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100 text-black">
          <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
          <p>
            <strong>Start:</strong>{" "}
            {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm a")}
          </p>
          <p>
            <strong>End:</strong>{" "}
            {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm a")}
          </p>
          <p>
            <strong>Description:</strong> {selectedEvent.description}
          </p>
        </div>
      )}
    </div>
  );
}
