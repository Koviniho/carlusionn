import uploadFile from '../services/uploadFile.js';
import path from 'path';

export const uploadFileController = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: 'No file uploaded',
    });
  }

  const uniqueFilename = `${Date.now()}-${file.originalname}`;

  uploadFile({ ...file, originalname: uniqueFilename })
    .then((data) => {
      res.status(200).json({
        message: 'File uploaded successfully',
        fileUrl: data.Location, 
      });
    })
    .catch((error) => {
      if (error.message === 'Unsupported file type') {
        return res.status(400).json({
          message: 'Unsupported file type. Only images, PDFs, and Word documents are allowed.',
        });
      }
      console.log(error);
      res.status(500).json({
        message: 'File upload failed',
        error: error.message,
      });
    });
};
