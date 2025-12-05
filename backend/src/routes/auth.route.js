import express from "express";
import authValidation from "../validations/auth.validations.js";
import validate from "../middlewares/validate.js";
import {
  getUser,
  loginController,
  registerController,
  googleLoginSingUp,
  facebookLoginSignUp,
  githubLoginSignUp,
  twitterLoginSignUp,
} from "../controllers/auth.Controller.js";
import { authMiddleware } from "../middlewares/accessControl.js";
const router = express.Router();
router.post(
  "/sign-up",
  validate(authValidation.registerSchema),
  registerController
);
router.post("/sign-in", validate(authValidation.loginSchema), loginController);
router.post("/google", googleLoginSingUp);
router.post("/facebook", facebookLoginSignUp);
router.post("/github", githubLoginSignUp);
router.post("/twitter", twitterLoginSignUp);

router.get("/me", authMiddleware, getUser);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get authenticated user details
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User fetched successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "65a1f1c8e4b08b0023d9c7a2"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     username:
 *                       type: string
 *                       example: "username123"
 *       401:
 *         description: Unauthorized, missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */








/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Login user and return JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrUsername
 *               - password
 *             properties:
 *               emailOrUsername:
 *                 type: string
 *                 example: "user@example.com"  # This can also be a username like "username123"
 *                 description: "User's email or username"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "yourPassword123"
 *                 description: "Password for the user"
 *     responses:
 *       200:
 *         description: User logged in successfully and JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "jwt-token-here"
 *       401:
 *         description: Invalid email/username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email/username or password"
 */

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *               - licenseKey
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "yourPassword123"
 *               username:
 *                 type: string
 *                 example: "username123"
 *               licenseKey:
 *                 type: string
 *                 example: "1234-5678-ABCD-EFGH"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ca"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     username:
 *                       type: string
 *                       example: "username123"
 *       400:
 *         description: Email, username, or license key is already taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email is already taken"
 */

export default router;
