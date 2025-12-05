import multer from "multer";

// Multer storage configuration
const storage = (uploadPath) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath); // Dynamic upload path
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
  });

// Multer middleware for image files
const uploadImages = (uploadPath, fieldName = "images", isMultiple = false) =>
  multer({
    storage: storage(uploadPath),
    fileFilter: (req, file, cb) => {
      // Validate if the file is an image
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed."), false);
      }
    },
  })[isMultiple ? "array" : "single"](fieldName);

export default uploadImages;
