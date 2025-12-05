import express from "express";

import validate from "../middlewares/validate.js"; // Validation middleware
import uploadPdf from "../middlewares/uploadPdf.js";
import contractTemplateValidationSchema from "../validations/contract-template.validation.js";
import {
  addNewContractTemplate,
  deleteContractTemplate,
  getAllContractTemplates,
  getContractTemplateById,
  updateContractTemplateById,
} from "../controllers/contract-template.controller.js";

const router = express.Router();

router.post(
  "/",
  uploadPdf("public/data/uploads/contractTemplates", "contractFile"), // Ensure the field name matches
  validate(contractTemplateValidationSchema),
  addNewContractTemplate
);

// Get all contract templates
router.get("/", getAllContractTemplates);

// Get a specific contract template by ID
router.get("/:id", getContractTemplateById);

router.put(
  "/:id",
  uploadPdf("public/data/uploads/contractTemplates", "contractFile"),
  updateContractTemplateById
);

// Delete a contract template by ID
router.delete("/:id", deleteContractTemplate);

/**
 * @swagger
 * /contract-template:
 *   post:
 *     summary: Add a new contract template (with file upload)
 *     tags:
 *       - ContractTemplate
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - templateId
 *               - templateName
 *               - createdBy
 *               - contractFile
 *               - contractType
 *             properties:
 *               templateId:
 *                 type: string
 *                 example: "12345"
 *               templateName:
 *                 type: string
 *                 example: "Standard Contract"
 *               createdBy:
 *                 type: string
 *                 example: "Admin"
 *               contractFile:
 *                 type: string
 *                 format: binary
 *                 description: "Contract template file (PDF)."
 *               contractType:
 *                 type: string
 *                 enum:
 *                   - Sales
 *                   - Lease
 *                 example: "Sales"
 *     responses:
 *       201:
 *         description: Contract Template added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract Template added successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 contractTemplate:
 *                   type: object
 *                   properties:
 *                     templateId:
 *                       type: string
 *                       example: "12345"
 *                     templateName:
 *                       type: string
 *                       example: "Standard Contract"
 *                     createdBy:
 *                       type: string
 *                       example: "Admin"
 *                     contractFile:
 *                       type: string
 *                       example: "contract_template.pdf"
 *                     contractType:
 *                       type: string
 *                       example: "Sales"
 *       400:
 *         description: Bad request (missing required fields or file)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File is required."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /contract-template:
 *   get:
 *     summary: Get all contract templates with pagination and filtering
 *     tags:
 *       - ContractTemplate
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
 *           example: "Sales"
 *         description: Search term to filter results.
 *     responses:
 *       200:
 *         description: Contract Templates fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract Templates fetched successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       templateId:
 *                         type: string
 *                         example: "12345"
 *                       templateName:
 *                         type: string
 *                         example: "Standard Contract"
 *                       createdBy:
 *                         type: string
 *                         example: "Admin"
 *                       contractFile:
 *                         type: string
 *                         example: "contract_template.pdf"
 *                       contractType:
 *                         type: string
 *                         example: "Sales"
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
 *         description: No contract templates found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No contract templates found."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /contract-template/{id}:
 *   get:
 *     summary: Retrieve a specific contract template by its ID
 *     tags:
 *       - ContractTemplate
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Unique identifier of the contract template
 *     responses:
 *       200:
 *         description: Contract Template fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract Template fetched successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 contractTemplate:
 *                   type: object
 *                   properties:
 *                     templateId:
 *                       type: string
 *                       example: "12345"
 *                     templateName:
 *                       type: string
 *                       example: "Standard Contract"
 *                     createdBy:
 *                       type: string
 *                       example: "Admin"
 *                     contractFile:
 *                       type: string
 *                       example: "contract_template.pdf"
 *                     contractType:
 *                       type: string
 *                       example: "Sales"
 *       404:
 *         description: Contract Template not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract Template not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /contract-template/{id}:
 *   delete:
 *     summary: Delete a contract template by ID
 *     tags:
 *       - ContractTemplate
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Unique identifier of the contract template
 *     responses:
 *       200:
 *         description: Contract Template deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract Template deleted successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Contract Template not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract Template not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /contract-template/{id}:
 *   put:
 *     summary: Update a contract template by ID (with file upload)
 *     tags:
 *       - ContractTemplate
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Unique identifier of the contract template
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               templateId:
 *                 type: string
 *                 example: "12345"
 *               templateName:
 *                 type: string
 *                 example: "Updated Contract"
 *               createdBy:
 *                 type: string
 *                 example: "Admin"
 *               contractFile:
 *                 type: string
 *                 format: binary
 *                 description: "New contract template file (PDF)."
 *               contractType:
 *                 type: string
 *                 enum:
 *                   - Sales
 *                   - Lease
 *                 example: "Sales"
 *     responses:
 *       200:
 *         description: Contract Template updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract Template updated successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 contractTemplate:
 *                   type: object
 *                   properties:
 *                     templateId:
 *                       type: string
 *                       example: "12345"
 *                     templateName:
 *                       type: string
 *                       example: "Updated Contract"
 *                     createdBy:
 *                       type: string
 *                       example: "Admin"
 *                     contractFile:
 *                       type: string
 *                       example: "updated_contract_template.pdf"
 *                     contractType:
 *                       type: string
 *                       example: "Sales"
 *       404:
 *         description: Contract Template not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract Template not found."
 *                 success:
 *                   type: boolean
 *                   example: false
 */

export default router;
