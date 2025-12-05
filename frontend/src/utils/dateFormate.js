import moment from "moment";

export const formatDate = (date, format = "DD MMM, YYYY") => {
  return moment(date).format(format);
};

export const formatDateByMonth = (dateString) => {
  if (!dateString) return ""; // Handle empty values

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC", // Ensure it stays in UTC
  }).format(date);
};

export const formatDateToDDMMYYYY = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};