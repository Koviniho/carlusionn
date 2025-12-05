import express from 'express';
import multer from 'multer';
import { uploadFileController } from '../controllers/fileController.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage }); 

router.post('/upload', upload.single('file'), uploadFileController);

export default router;
/**
 * @swagger
 * /api/file/upload:
 *   post:
 *     summary: Upload a file
 *     description: Uploads a file to the server, which will be stored in an S3 bucket. Supported file types include images, PDFs, and Word documents.
 *     tags: 
 *       - File Upload
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File uploaded successfully"
 *                 fileUrl:
 *                   type: string
 *                   example: "https://your-s3-bucket.amazonaws.com/uploads/file.jpg"
 *       400:
 *         description: Bad request, unsupported file type or no file uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No file uploaded"
 *       500:
 *         description: Internal server error, file upload failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File upload failed"
 *                 error:
 *                   type: string
 *                   example: "Error message details"
 */
