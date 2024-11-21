import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./custom-calendar-styles.scss"; // Import the custom styles

// Localizer for React Big Calendar
const localizer = momentLocalizer(moment);

// Event data (unchanged)
const events = [
  {
    id: 1,
    title: "Team Meeting",
    start: moment("2024-11-22T10:00:00Z").toDate(),
    end: moment("2024-11-22T11:00:00Z").toDate(),
    colorEvento: "#C9B0FF",
    color: "black",
    description: "Discuss the team project and weekly updates.",
  },
  {
    id: 2,
    title: "Project Deadline",
    start: moment("2024-11-25T12:00:00Z").toDate(),
    end: moment("2024-11-25T14:00:00Z").toDate(),
    colorEvento: "#3FB898",
    color: "black",
    description: "Final project submission deadline.",
  },
];

// Function to apply custom styles to the current day
const calendarStyle = (date: Date) => {
  const currentDate = `${new Date().getDate()} ${new Date().getMonth() + 1} ${new Date().getFullYear()}`;
  const allDate = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;

  // Check if the date matches the current date and apply custom styles
  if (allDate === currentDate) {
    return {
      style: {
        backgroundColor: '#F1F0FE', // Purple background
        color: 'white', // White text color for contrast
        margin: 0,
        padding: 0
      }
    };
  }

  // Return null if no custom style is needed
  return {};
};

export default function EventCalendar() {
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
          return { style: { backgroundColor, color } };
        }}
        dayPropGetter={(date) => {
          // Apply the custom styling for the current day
          return calendarStyle(date);
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