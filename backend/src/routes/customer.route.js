import express from "express";
import validate from "../middlewares/validate.js";
import customerValidationSchema from "../validations/customer.validation.js";
import {
  addNewCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomerById,
} from "../controllers/customer.controller.js";
import uploadImages from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/",
  uploadImages("public/data/uploads/customer", "profileImage", false),
  validate(customerValidationSchema),
  addNewCustomer
);
router.get("/", getAllCustomer);
router.put(
  "/:id",
  uploadImages("public/data/uploads/customer", "profileImage", false),
  updateCustomerById
);
router.delete("/:id", deleteCustomer);

router.get("/:id", getCustomerById);

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Add a new customer
 *     tags:
 *       - Customer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - email
 *               - phoneNunmber
 *               - status
 *               - profileImage
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: "Profile image file of the customer."
 *               customerName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               phoneNunmber:
 *                 type: string
 *                 example: "+1234567890"
 *               lastInteraction:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-18T12:00:00Z"
 *                 description: "Optional field for the last interaction date."
 *               totalPurchases:
 *                 type: number
 *                 format: integer
 *                 example: 5
 *                 description: "Total number of purchases made by the customer."
 *               companyName:
 *                 type: string
 *                 example: "ABC Corp"
 *               address:
 *                 type: string
 *                 example: "123 Main Street, City, Country"
 *               insuranceProvider:
 *                 type: string
 *                 example: "XYZ Insurance"
 *               licensePlateNumber:
 *                 type: string
 *                 example: "AB-123-CD"
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - inactive
 *                   - follow-up
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Customer added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer added successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 customer:
 *                   type: object
 *                   properties:
 *                     profileImage:
 *                       type: string
 *                       example: "profile_image.jpg"
 *                     customerName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phoneNunmber:
 *                       type: string
 *                       example: "+1234567890"
 *                     lastInteraction:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-18T12:00:00Z"
 *                     totalPurchases:
 *                       type: number
 *                       example: 5
 *                     companyName:
 *                       type: string
 *                       example: "ABC Corp"
 *                     address:
 *                       type: string
 *                       example: "123 Main Street, City, Country"
 *                     insuranceProvider:
 *                       type: string
 *                       example: "XYZ Insurance"
 *                     licensePlateNumber:
 *                       type: string
 *                       example: "AB-123-CD"
 *                     status:
 *                       type: string
 *                       example: "active"
 *       400:
 *         description: Bad request (missing required fields or file)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile Pic is required."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Get all customers with pagination and filtering
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of records per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "John"
 *         description: Search term to filter customers by name, email, or other fields.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *             - follow-up
 *         description: Filter customers by status.
 *     responses:
 *       200:
 *         description: Customers fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer fetched successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f5e3c81d1c4a0012345678"
 *                       profileImage:
 *                         type: string
 *                         example: "customer_image.jpg"
 *                       customerName:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       phoneNunmber:
 *                         type: string
 *                         example: "+1234567890"
 *                       lastInteraction:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-01T10:00:00Z"
 *                       totalPurchases:
 *                         type: number
 *                         example: 5
 *                       companyName:
 *                         type: string
 *                         example: "Acme Corp."
 *                       address:
 *                         type: string
 *                         example: "123 Main St, Springfield"
 *                       insuranceProvider:
 *                         type: string
 *                         example: "Allianz"
 *                       licensePlateNumber:
 *                         type: string
 *                         example: "ABC-1234"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                 totalCount:
 *                   type: integer
 *                   example: 50
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while fetching customers."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f5e3c81d1c4a0012345678"
 *         description: The unique identifier of the customer to be deleted.
 *     responses:
 *       200:
 *         description: Customer deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer deleted successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while deleting the customer."
 *                 success:
 *                   type: boolean
 *                   example: false
 */
/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f5e3c81d1c4a0012345678"
 *         description: The unique identifier of the customer to retrieve.
 *     responses:
 *       200:
 *         description: Customer fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer fetched successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 customer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f5e3c81d1c4a0012345678"
 *                     profileImage:
 *                       type: string
 *                       example: "customer_image.jpg"
 *                     customerName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phoneNunmber:
 *                       type: string
 *                       example: "1234567890"
 *                     lastInteraction:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-01T10:30:00.000Z"
 *                     totalPurchases:
 *                       type: number
 *                       example: 5
 *                     companyName:
 *                       type: string
 *                       example: "Doe Enterprises"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, Springfield, USA"
 *                     insuranceProvider:
 *                       type: string
 *                       example: "ABC Insurance"
 *                     licensePlateNumber:
 *                       type: string
 *                       example: "XYZ1234"
 *                     status:
 *                       type: string
 *                       example: "active"
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while fetching the customer."
 *                 success:
 *                   type: boolean
 *                   example: false
 */
/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f5e3c81d1c4a0012345678"
 *         description: The unique identifier of the customer to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phoneNunmber:
 *                 type: string
 *                 example: "1234567890"
 *               lastInteraction:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-01T10:30:00.000Z"
 *               totalPurchases:
 *                 type: number
 *                 example: 5
 *               companyName:
 *                 type: string
 *                 example: "Doe Enterprises"
 *               insuranceProvider:
 *                 type: string
 *                 example: "ABC Insurance"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Springfield, USA"
 *               licensePlateNumber:
 *                 type: string
 *                 example: "XYZ1234"
 *               status:
 *                 type: string
 *                 example: "active"
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: The new profile image (optional). This is a file upload.
 *     responses:
 *       200:
 *         description: Customer updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer updated successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 customer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f5e3c81d1c4a0012345678"
 *                     profileImage:
 *                       type: string
 *                       example: "new_profile_image.jpg"
 *                     customerName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phoneNunmber:
 *                       type: string
 *                       example: "1234567890"
 *                     lastInteraction:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-01T10:30:00.000Z"
 *                     totalPurchases:
 *                       type: number
 *                       example: 5
 *                     companyName:
 *                       type: string
 *                       example: "Doe Enterprises"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, Springfield, USA"
 *                     insuranceProvider:
 *                       type: string
 *                       example: "ABC Insurance"
 *                     licensePlateNumber:
 *                       type: string
 *                       example: "XYZ1234"
 *                     status:
 *                       type: string
 *                       example: "active"
 *       400:
 *         description: Bad request (e.g., missing required fields).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad request. Missing required fields."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while updating the customer."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

export default router;
