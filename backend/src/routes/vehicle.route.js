import express from "express";
import {
  addNewVehicle,
  getAllVehicles,
  getVehicleById,
  deleteVehicle,
  updateVehicleById,
} from "../controllers/vehicle.controller.js";
import uploadImages from "../middlewares/multer.js";
import validate from "../middlewares/validate.js";
import vehicleValidationSchema from "../validations/vehicle.validation.js";
const router = express.Router();

router.post(
  "/",
  uploadImages("public/data/uploads/vehicle", "images", true),
  validate(vehicleValidationSchema),
  addNewVehicle
);
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.put(
  "/:vehicleId",
  uploadImages("public/data/uploads/vehicle", "images", true),
  updateVehicleById
);
router.delete("/:id", deleteVehicle);

/**
 * @swagger
 * /vehicle:
 *   post:
 *     summary: Add a new vehicle
 *     tags:
 *       - Vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleId
 *               - stockNo
 *               - brand
 *               - model
 *               - year
 *               - price
 *               - mileage
 *               - location
 *               - status
 *               - images
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 example: "V12345"
 *                 description: "Unique identifier for the vehicle."
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: "Vehicle image file."
 *                 description: "At least one image is required."
 *               stockNo:
 *                 type: string
 *                 example: "12345"
 *               year:
 *                 type: integer
 *                 example: 2020
 *                 description: "Must be greater than or equal to 1886."
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 25000
 *                 description: "Must be a non-negative value."
 *               mileage:
 *                 type: number
 *                 format: float
 *                 example: 50000
 *                 description: "Must be a non-negative value."
 *               location:
 *                 type: string
 *                 example: "New York"
 *               status:
 *                 type: string
 *                 enum:
 *                   - available
 *                   - sold
 *                   - reserved
 *                 example: "available"
 *               brand:
 *                 type: string
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 example: "Camry"
 *               type:
 *                 type: string
 *                 example: "Sedan"
 *     responses:
 *       201:
 *         description: Vehicle added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle added successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 vehicle:
 *                   type: object
 *                   properties:
 *                     vehicleId:
 *                       type: string
 *                       example: "V12345"
 *                       description: "Unique identifier for the vehicle."
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "vehicle_image1.jpg"
 *                       description: "Array of vehicle image filenames."
 *                     stockNo:
 *                       type: string
 *                       example: "12345"
 *                     year:
 *                       type: integer
 *                       example: 2020
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 25000
 *                     mileage:
 *                       type: number
 *                       format: float
 *                       example: 50000
 *                     location:
 *                       type: string
 *                       example: "New York"
 *                     status:
 *                       type: string
 *                       example: "available"
 *                     brand:
 *                       type: string
 *                       example: "Toyota"
 *                     model:
 *                       type: string
 *                       example: "Camry"
 *                     type:
 *                       type: string
 *                       example: "Sedan"
 *       400:
 *         description: Bad request (missing required fields or files)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "At least one image file is required."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /vehicle:
 *   get:
 *     summary: Get all vehicles with pagination and filtering
 *     tags:
 *       - Vehicle
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of items per page (default is 10).
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "Toyota"
 *         description: Search term to filter results.
 *     responses:
 *       200:
 *         description: Vehicles fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicles fetched successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       stockNo:
 *                         type: string
 *                         example: "12345"
 *                       makeAndModel:
 *                         type: string
 *                         example: "Toyota Camry"
 *                       year:
 *                         type: integer
 *                         example: 2020
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 25000
 *                       mileage:
 *                         type: number
 *                         format: float
 *                         example: 50000
 *                       location:
 *                         type: string
 *                         example: "New York"
 *                       status:
 *                         type: string
 *                         example: "available"
 *                       image:
 *                         type: string
 *                         example: "vehicle_image.jpg"
 *                 totalCount:
 *                   type: integer
 *                   example: 100
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPreviousPage:
 *                       type: boolean
 *                       example: false
 *       404:
 *         description: No vehicles found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No vehicles found."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /vehicle/{vehicleId}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags:
 *       - Vehicle
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vehicle to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               stockNo:
 *                 type: string
 *                 example: "V1234"
 *               year:
 *                 type: integer
 *                 example: 2022
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 25000.99
 *               mileage:
 *                 type: integer
 *                 example: 15000
 *               location:
 *                 type: string
 *                 example: "New York"
 *               status:
 *                 type: string
 *                 enum: [Available, Sold, Reserved]
 *                 example: "Available"
 *               brand:
 *                 type: string
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 example: "Corolla"
 *               type:
 *                 type: string
 *                 example: "Sedan"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: "Array of images to upload. Up to 4 images allowed."
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle updated successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 vehicle:
 *                   type: object
 *                   properties:
 *                     vehicleId:
 *                       type: string
 *                       example: "VIN1234567890"
 *                     stockNo:
 *                       type: string
 *                       example: "V1234"
 *                     year:
 *                       type: integer
 *                       example: 2022
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 25000.99
 *                     mileage:
 *                       type: integer
 *                       example: 15000
 *                     location:
 *                       type: string
 *                       example: "New York"
 *                     status:
 *                       type: string
 *                       enum: [Available, Sold, Reserved]
 *                       example: "Available"
 *                     brand:
 *                       type: string
 *                       example: "Toyota"
 *                     model:
 *                       type: string
 *                       example: "Corolla"
 *                     type:
 *                       type: string
 *                       example: "Sedan"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ["image1.jpg", "image2.jpg"]
 *       400:
 *         description: Invalid data provided
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /vehicle/{id}:
 *   get:
 *     summary: Retrieve a specific vehicle by its ID
 *     tags:
 *       - Vehicle
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Unique identifier of the vehicle
 *         schema:
 *           type: string
 *           example: "64d9c11d9f8a9e01e8bda833"
 *     responses:
 *       200:
 *         description: Vehicle retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle fetched successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 vehicle:
 *                   type: object
 *                   properties:
 *                     stockNo:
 *                       type: string
 *                       example: "12345"
 *                     makeAndModel:
 *                       type: string
 *                       example: "Toyota Camry"
 *                     year:
 *                       type: integer
 *                       example: 2020
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 25000
 *                     mileage:
 *                       type: number
 *                       format: float
 *                       example: 50000
 *                     location:
 *                       type: string
 *                       example: "New York"
 *                     status:
 *                       type: string
 *                       example: "available"
 *                     image:
 *                       type: string
 *                       example: "vehicle_image.jpg"
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /vehicle/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags:
 *       - Vehicle
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the vehicle to delete
 *         schema:
 *           type: string
 *           example: "64d9c11d9f8a9e01e8bda833"  # Example MongoDB ObjectID
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle deleted successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

export default router;
