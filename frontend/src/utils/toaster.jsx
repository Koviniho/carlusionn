import { toast, ToastContainer } from "react-toastify";
const showToast = (
  type = "success",
  content,
  options = { position: "top-right", autoClose: 3000 }
) => {
  switch (type) {
    case "success":
      toast.success(content, options);
      break;
    case "error":
      toast.error(content, options);
      break;
    case "info":
      toast.info(content, options);
      break;
    case "warning":
      toast.warn(content, options);
      break;
    default:
      toast.success(content, options);
  }
};

export default showToast;
