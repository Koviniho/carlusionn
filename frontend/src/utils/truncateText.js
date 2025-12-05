const truncateText = (value, maxLength = 15) => {
  if (typeof value !== "string") return value; // Return as-is if not a string
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
};
export default truncateText;
