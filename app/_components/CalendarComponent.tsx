import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./custom-calendar-styles.scss"; // Import the custom styles

// Localizer for React Big Calendar
const localizer = momentLocalizer(moment);

// Event data (unchanged)
// Event data (updated with 10 events for Nov and Dec)
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
  {
    id: 3,
    title: "Client Call",
    start: moment("2024-11-28T09:00:00Z").toDate(),
    end: moment("2024-11-28T10:00:00Z").toDate(),
    colorEvento: "#FF8C00",
    color: "white",
    description: "Discussion with client regarding project requirements.",
  },
  {
    id: 4,
    title: "Code Review",
    start: moment("2024-11-29T11:00:00Z").toDate(),
    end: moment("2024-11-29T12:00:00Z").toDate(),
    colorEvento: "#FF6347",
    color: "white",
    description: "Reviewing the latest code commits with the team.",
  },
  {
    id: 5,
    title: "Team Brainstorming",
    start: moment("2024-12-02T14:00:00Z").toDate(),
    end: moment("2024-12-02T15:00:00Z").toDate(),
    colorEvento: "#4682B4",
    color: "white",
    description: "Brainstorming session for the upcoming sprint.",
  },
  {
    id: 6,
    title: "Sprint Planning",
    start: moment("2024-12-05T10:00:00Z").toDate(),
    end: moment("2024-12-05T12:00:00Z").toDate(),
    colorEvento: "#32CD32",
    color: "black",
    description: "Planning tasks and goals for the next sprint.",
  },
  {
    id: 7,
    title: "Presentation Preparation",
    start: moment("2024-12-08T13:00:00Z").toDate(),
    end: moment("2024-12-08T15:00:00Z").toDate(),
    colorEvento: "#FF4500",
    color: "white",
    description: "Prepare slides and materials for the team presentation.",
  },
  {
    id: 8,
    title: "Team Lunch",
    start: moment("2024-12-10T12:00:00Z").toDate(),
    end: moment("2024-12-10T13:00:00Z").toDate(),
    colorEvento: "#FFD700",
    color: "black",
    description: "Casual team lunch to discuss progress and issues.",
  },
  {
    id: 9,
    title: "Product Demo",
    start: moment("2024-12-15T16:00:00Z").toDate(),
    end: moment("2024-12-15T17:00:00Z").toDate(),
    colorEvento: "#8A2BE2",
    color: "white",
    description: "Demo of the new product features to stakeholders.",
  },
  {
    id: 10,
    title: "Year-End Review",
    start: moment("2024-12-20T09:00:00Z").toDate(),
    end: moment("2024-12-20T11:00:00Z").toDate(),
    colorEvento: "#3B9E9B",
    color: "black",
    description: "Review of team and project performance for the year.",
  },
];

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
        margin: 0,
        padding: 0,
      },
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
        views={["week", "day","agenda"]} // Allow week view
        defaultView="week" // Set default view to 'week'
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
