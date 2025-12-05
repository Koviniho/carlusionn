import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Changed to react-icons/fa
import enUS from "date-fns/locale/en-US";
import Icons from "../../assets/icons";
import CustomSelect from "../customSelect/customSelect";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Visitor Event",
    start: new Date(2024, 11, 24, 10, 0),
    end: new Date(2024, 11, 24, 11, 0),
    type: "visitor",
  },
  {
    title: "Urban Event",
    start: new Date(2024, 11, 27, 10, 30),
    end: new Date(2024, 11, 27, 11, 30),
    type: "urban",
  },
  {
    title: "Tech Sync",
    start: new Date(2024, 11, 22, 4, 0),
    end: new Date(2024, 11, 22, 5, 0),
    type: "tech",
  },
];


const customStyles = `
  .rbc-header {
    background-color:#1E599B;
    color: white;
    padding: 1rem !important;
    font-weight: normal;
  }
  
  .rbc-time-header {
    background-color: #1E599B;
  }

  .rbc-time-header-content {
    background-color: #1E599B;
  }

  .rbc-today {
    background-color: transparent !important;
  }

  .rbc-time-gutter .rbc-timeslot-group {
    font-size: 0.875rem;
    color: #6b7280;
    
  }
  .rbc-time-gutter{
  width:80px
  }
  .rbc-current-time-indicator {
    background-color: #3b82f6;
  }

  .rbc-event {
  
    padding: 4px 8px !important;
    border-radius: 4px !important;
    background-color: #10b981 !important;
  }
    .rbc-event-content{
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .rbc-events-container .rbc-day-slot{
   margin-right: 0px !important;
    }
    
    .rbc-toolbar{
    display:none
    }

    .rbc-time-header-cell{
    height: 102px !important;
    font-family: 'Poppins', sans-serif !important;
  font-weight: 500 !important;
  font-size: 20px !important;
    }
    .columnheader{
     font-family: 'Poppins', sans-serif !important;
  font-weight: 500 !important;
  font-size: 20px !important;
    }
  .rbc-allday-cell{
  display:none
  }
  .rbc-header{
  display: flex;
  justify-content: center; 
  align-items: center;
  }
  .rbc-calendar{
    border-radius: 50%;
  }
    .rbc-time-header{
    }
    .rbc-timeslot-group{
    height: 70px;
    }
    .rbc-event-label{
    display:none !important

    }
    .rbc-time-header{
  border:none
    }
  .rbc-header{
  // border-radius: 0.5rem;
  }
  .rbc-header{
  border:none
  }
`;

const calenderAddOptions = [
  { value: "", label: "add" },
  { value: "event", label: "event" },
  { value: "task", label: "task" },
  { value: "appointment", label: "Appointment" },



];
const calenderOptions = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];
const CustomCalendar = () => {
  const [view, setView] = useState("week");
  const [date, setDate] = useState(new Date(2024, 11, 24));

  const eventStyleGetter = (event) => {
    let backgroundColor = "#10b981";

    switch (event.type) {
      case "visitor":
        backgroundColor = "#10b981";
        break;
      case "urban":
        backgroundColor = "#06b6d4";
        break;
      case "tech":
        backgroundColor = "#10b981";
        break;
      default:
        backgroundColor = "#10b981";
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 1,
        color: "white",
        border: "none",
        fontSize: "0.875rem",
      },
    };
  };

  return (
    <div className="w-full h-screen bg-white">
      {/* Custom styles */}
      <style>{customStyles}</style>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold">December 2024</h2>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
          {/* <button className="px-4 py-1 border rounded">Week</button> */}
          {/* <div className=" grid grid-cols-1">
            <select
              id="location"
              name="location"
              defaultValue="Canada"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
            <Icons.IoIosArrowDown
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div> */}
          <CustomSelect
            label="Country"
            name="country"
            options={calenderOptions}
            defaultValue="ca"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border-b pb-2 gap-2 ">
            <img
              src={Icons.search}
              alt="search-icon"
              className="h-[12px] w-[12px]"
            />
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none placeholder-darkBlue text-darkBlue text-[12px] font-medium"
            />
          </div>
          <div>
            <button className="py-3 px-4 bg-primary border border-darkBlue  rounded">
              <Icons.IoCalendarOutline color="white" size={20} />
            </button>
            <button className="py-3 px-4 bg-white border border-l-0 rounded-tr rounded-br">
              <Icons.FiCheckCircle size={20} />
            </button>
          </div>

          <CustomSelect
            label="event"
            name="event"
            options={calenderAddOptions}
            defaultValue="event"
            onChange={(e) => console.log(e.target.value)}
            backgroundColor="bg-primary"
            textColor="text-white"
            icon={<Icons.FiPlus />}
          />
        </div>
      </div>

      {/* Calendar */}
      <div className="h-[calc(100vh-80px)] rounded-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          view={view}
          onView={(newView) => setView(newView)}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          eventPropGetter={eventStyleGetter}
          className="rounded-lg"
          formats={{
            timeGutterFormat: (date) => format(date, "h\na"),
            dayFormat: (date) => {
              const day = format(date, "EEE");
              const dayNum = format(date, "d");
              return `${day}\n${dayNum}`;
            },
          }}
          min={new Date(2024, 11, 24, 0, 0)}
          max={new Date(2024, 11, 24, 23, 59)}
        />
      </div>
    </div>
  );
};

export default CustomCalendar;
