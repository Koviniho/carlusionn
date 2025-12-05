import express from "express";
import validate from "../middlewares/validate.js"; // Validation middleware

const router = express.Router();
import {
  addNewContract,
  getAllContracts,
  getContractById,
  deleteContract,
  updateContractById,
} from "../controllers/contract.controller.js";
import contractValidationSchema from "../validations/contract.validation.js";

router.get("/", getAllContracts);

router.post("/", validate(contractValidationSchema), addNewContract);
router.get("/:id", getContractById);
router.delete("/:id", deleteContract);
router.put("/:id", validate(contractValidationSchema), updateContractById);
/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: API for managing contracts
 */

/**
 * @swagger
 * /contracts:
 *   post:
 *     summary: Add a new contract
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contractId
 *               - customerName
 *               - carModel
 *               - status
 *             properties:
 *               contractId:
 *                 type: string
 *                 example: "64b7a4fcd123c79b8f98312e"
 *               customerName:
 *                 type: string
 *                 example: "John Doe"
 *               carModel:
 *                 type: string
 *                 example: "Toyota Corolla"
 *               status:
 *                 type: string
 *                 enum: [Signed, Draft, Expired, Pending]
 *                 example: "Signed"
 *     responses:
 *       201:
 *         description: Contract added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract added successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /contracts:
 *   get:
 *     summary: Get all contracts
 *     tags: [Contracts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "John Doe"
 *     responses:
 *       200:
 *         description: A list of contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contracts fetched successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contractId:
 *                         type: string
 *                       customerName:
 *                         type: string
 *                       carModel:
 *                         type: string
 *                       salesPerson:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [Signed, Draft, Expired, Pending]
 *       404:
 *         description: No contracts found
 */

/**
 * @swagger
 * /contracts/{id}:
 *   get:
 *     summary: Get a contract by ID
 *     tags: [Contracts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64b7a4fcd123c79b8f98312e"
 *     responses:
 *       200:
 *         description: Contract details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract fetched successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 contract:
 *                   type: object
 *                   properties:
 *                     contractId:
 *                       type: string
 *                     customerName:
 *                       type: string
 *                     carModel:
 *                       type: string
 *                     salesPerson:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [Signed, Draft, Expired, Pending]
 *       404:
 *         description: Contract not found
 */

/**
 * @swagger
 * /contracts/{id}:
 *   delete:
 *     summary: Delete a contract by ID
 *     tags: [Contracts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64b7a4fcd123c79b8f98312e"
 *     responses:
 *       200:
 *         description: Contract deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract deleted successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Contract not found
 */

/**
 * @swagger
 * /contracts/{id}:
 *   put:
 *     summary: Update a contract by ID
 *     tags: [Contracts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "64b7a4fcd123c79b8f98312e"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "John Smith"
 *               carModel:
 *                 type: string
 *                 example: "Honda Civic"
 *               salesPerson:
 *                 type: string
 *                 example: "Alice Brown"
 *               status:
 *                 type: string
 *                 enum: [Signed, Draft, Expired, Pending]
 *                 example: "Pending"
 *     responses:
 *       200:
 *         description: Contract updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contract updated successfully."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 contract:
 *                   type: object
 *                   properties:
 *                     contractId:
 *                       type: string
 *                     customerName:
 *                       type: string
 *                     carModel:
 *                       type: string
 *                     salesPerson:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [Signed, Draft, Expired, Pending]
 *       404:
 *         description: Contract not found
 */

export default router;
