import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";
import Button from "../../components/Button";
import CustomInput from "../../components/Input/custoInput";
import PopUpModel from "../../components/Modals/pop-up-modals";
import { FaPlus } from "react-icons/fa";

function CalendarPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleOpenModal = () => {
    setModalOpen(!modalOpen);
  };

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: [
      {
        id: 1,
        title: "My new event",
        start: "2025-01-01 00:00",
        end: "2025-01-01 02:00",
      },
      {
        id: 2,
        title: "pending event",
        start: "2025-03-04 00:00",
        end: "2025-03-04 02:00",
      },
      {
        id: 3,
        title: "pending event",
        start: "2025-03-04 05:00",
        end: "2025-03-04 06:00",
      },
      {
        id: 3,
        title: "pending event",
        start: "2025-03-04 11:00",
        end: "2025-03-04 12:00",
      },
    ],
    selectedDate: "2025-03-04",
  });

  const fields = [
    {
      name: "title",
      label: "Title",
      placeholder: "Enter Title",
    },
    {
      name: "beginningDate",
      label: "Beginning Date",
      placeholder: "Beginning Date",
      type: "date",
    },
    {
      name: "beginningTime",
      label: "Beginning Time",
      placeholder: "Beginning Time",
      type: "time",
    },

    {
      name: "endDate",
      label: "End Date",
      placeholder: "End Date",
      type: "date",
    },
    {
      name: "endTime",
      label: "End Time",
      placeholder: "End Time",
      type: "time",
    },

    {
      name: "calendarType",
      label: "Calendar Type",
      type: "select",
      options: [
        { value: "", label: "Select Contract" },
        { value: "Option-1", label: "option-1" },
        { value: "Option-1", label: "option-2" },
      ],
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Description",
      type: "textarea",
    },
    {
      name: "customerName",
      label: "Customer Name",
      placeholder: "Customer Name",
    },
  ];

  return (
    <div>
      <Breadcrumb heading="Calendar" pageName="Calendar" />

      <PopUpModel
        heading="Create Appointment"
        trigger={
          <Button
            text="Add New Appointment"
            borderRadius="rounded-md"
            textColor="white hover:text-[#1A2042]"
            icon={<FaPlus className="h-3 w-3" />}
            // bgColor="[#1A2042]"
            onClick={toggleOpenModal}
          />
        }
        modalOpen={modalOpen}
        setModalOpen={toggleOpenModal}
      >
        {/* space-y-7 p-6 bg-white rounded-md shadow-md */}
        <form
          // onSubmit={formik.handleSubmit}
          className="space-y-5 p-6 bg-white rounded-md shadow-md"
        >
          {fields.map((field) => (
            <CustomInput
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              placeholder={field?.placeholder}
              // value={formik.values[field.name]}
              // onChange={(e) => {
              //   formik.handleChange(e); // Update Formik value
              //   const { name, value } = e.target;

              //   // Handle setting state for contractId, customerName, and carModel
              //   if (name === "contractId") {
              //     const selectedOption = countractIDOption.find(
              //       (option) => option.value === value
              //     );
              //     setcontractId(selectedOption ? selectedOption.id : null);
              //   } else if (name === "customerName") {
              //     const selectedOption = customerNameOption.find(
              //       (option) => option.value === value
              //     );
              //     setcustomerNameId(selectedOption ? selectedOption.id : null);
              //   } else if (name === "carModel") {
              //     const selectedOption = vehicleOption.find(
              //       (option) => option.value === value
              //     );
              //     setCarModelId(selectedOption ? selectedOption.id : null);
              //   }
              // }}
              // onBlur={formik.handleBlur}
              // error={formik.errors[field.name]}
              // touched={formik.touched[field.name]}
              options={field?.options || []}
            />
          ))}

          <div className="space-y-3">
            <CustomInput type="checkbox" label="All-Day" disabled />
            <CustomInput type="checkbox" label="Repeat " disabled />
          </div>
          <div className="border p-2 rounded-lg">
            <CustomInput type="toggle" label="SMS Reminder" />
          </div>

          <div className="pt-10">
            <Button
              type="submit"
              text="Save"
              className="w-full"
              borderRadius="rounded-md"
              textColor="white"
              // bgColor="[#1A2042]"
            />
          </div>
        </form>
      </PopUpModel>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarPage;
