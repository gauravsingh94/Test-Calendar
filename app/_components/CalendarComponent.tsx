import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./custom-calendar-styles.scss"; // Import the custom styles

// Localizer for React Big Calendar
const localizer = momentLocalizer(moment);

// Type definition for the event structure
interface EventDetails {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  colorEvento: string; // Use hash color codes for background
  color: string; // Use hash color codes for text color
}

export default function EventCalendar() {
  // State to hold the selected event details
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);

  const events: EventDetails[] = [
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

  const handleEventClick = (event: EventDetails) => {
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
        onSelectEvent={handleEventClick} // Handle event click
        eventPropGetter={(event) => {
          // Apply colors based on the event's color properties (using hash colors)
          const backgroundColor = event.colorEvento || "#0000FF"; // Default to blue if not provided
          const color = event.color || "#000000"; // Default to black text color if not provided
          return { style: { backgroundColor, color } };
        }}
        components={{
          event: ({ event }) => (
            <span style={{ color: 'black' }} className="text-black">
              {event.title}
            </span>
          ),
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