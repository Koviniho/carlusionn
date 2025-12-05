import Swal from "sweetalert2";

// Generic function for success alerts
export const showSuccessAlert = (title = "Success", text = "Operation completed successfully!") => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    confirmButtonText: "OK",
    confirmButtonColor:"#1E599B",
    timer: 3000,
    timerProgressBar: true,
  });
};

// Generic function for error alerts
export const showErrorAlert = (title = "Error", text = "Something went wrong. Please try again!") => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    confirmButtonText: "OK",
    confirmButtonColor:"#1E599B",

  });
};
