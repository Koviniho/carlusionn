import multer from "multer";
import path from "path";

// Multer storage configuration
const storage = (uploadPath) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      // Use the uploadPath passed to the middleware
      cb(null, uploadPath); // Use dynamic upload path
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the PDF file
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

// Multer middleware configuration for PDF files
const uploadPdf = (uploadPath, fieldName = "pdf") =>
  multer({
    storage: storage(uploadPath),
    fileFilter: (req, file, cb) => {
      console.log("Processing file with field name: ", file.fieldname); // Debug log

      // Check if the uploaded file is a PDF
      if (file.mimetype === "application/pdf") {
        cb(null, true); // Accept the file if it's a PDF
      } else {
        cb(new Error("Only PDF files are allowed."), false); // Reject the file if it's not a PDF
      }
    },
  }).single(fieldName); // Use dynamic field name

export default uploadPdf;
