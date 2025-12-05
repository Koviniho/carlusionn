import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import ApiError from "../utils/api.error.js";
import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.config.js";
import admin from "../firebase.js";
//sign in the user
const loginController = async (req, res, next) => {
  const { emailOrUsername, password, rememberMe } = req.body;

  try {
    // Check if the provided input is an email or username and query the user accordingly
    let user;
    if (emailOrUsername.includes("@")) {
      // If the input contains "@", it's treated as an email
      user = await User.findOne({ email: emailOrUsername });
    } else {
      // Otherwise, treat it as a username
      user = await User.findOne({ username: emailOrUsername });
    }

    if (!user) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Invalid email/username or password"
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Invalid email/username or password"
      );
    }

    // Set token expiration based on rememberMe
    const expiresIn = rememberMe ? "30d" : JWT_EXPIRES_IN; // Default expiry from JWT_EXPIRES_IN

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn }
    );

    res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// register a new user
const registerController = async (req, res, next) => {
  const { email, password, role, username, licenseKey } = req.body;

  try {
    // Check if the email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
      }
      if (existingUser.username === username) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Username is already taken");
      }
    }
    // Create and save new user
    const newUser = new User({ email, password, role, username, licenseKey });
    await newUser.save();

    // Respond with success
    res.status(httpStatus.CREATED).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        username: newUser.username,
        licenseKey: newUser.licenseKey,
      },
    });
  } catch (error) {
    next(error);
  }
};
// google signUp and signIn
const googleLoginSingUp = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name } = decodedToken;

    // Check if the user exists in your database
    let user = await User.findOne({ email });

    // If needed, handle user creation logic here

    if (!user) {
      // If the user doesn't exist, create a new one
      user = new User({
        email,
        socialId: uid,
        username: name,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      JWT_SECRET, // Secret
      { expiresIn: JWT_EXPIRES_IN } // Options object
    );

    res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during Google login/signup:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

// facebook signUp and singIn
const facebookLoginSignUp = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("🚀 ~ facebookLoginSignUp ~ decodedToken:", decodedToken);

    const { uid, email, name } = decodedToken;
    // console.log("🚀 ~ facebookLoginSignUp ~ uid:", uid);
    // console.log("email", email);

    // Check if the user exists in your database
    let user = email
      ? await User.findOne({ email })
      : await User.findOne({ socialId: uid });

    // If needed, handle user creation logic here
    console.log("user", user);
    if (!user) {
      // If the user doesn't exist, create a new one
      user = new User({
        email,
        socialId: uid,
        username: name,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      JWT_SECRET, // Secret
      { expiresIn: JWT_EXPIRES_IN } // Options object
    );

    res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during Google login/signup:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
//github signup and login
const githubLoginSignUp = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name } = decodedToken;

    // Check if the user exists in your database
    let user = email
      ? await User.findOne({ email })
      : await User.findOne({ socialId: uid });

    // If needed, handle user creation logic here
    if (!user) {
      // If the user doesn't exist, create a new one
      user = new User({
        email,
        socialId: uid,
        username: name,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      JWT_SECRET, // Secret
      { expiresIn: JWT_EXPIRES_IN } // Options object
    );

    res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during Google login/signup:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
//twitter signup and login
const twitterLoginSignUp = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name } = decodedToken;

    // Check if the user exists in your database
    let user = email
      ? await User.findOne({ email })
      : await User.findOne({ socialId: uid });

    // If needed, handle user creation logic here
    if (!user) {
      // If the user doesn't exist, create a new one
      user = new User({
        email,
        socialId: uid,
        username: name,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      JWT_SECRET, // Secret
      { expiresIn: JWT_EXPIRES_IN } // Options object
    );

    res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during Google login/signup:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    res.status(httpStatus.OK).json({
      message: "User fetched successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  loginController,
  registerController,
  getUser,
  googleLoginSingUp,
  facebookLoginSignUp,
  githubLoginSignUp,
  twitterLoginSignUp,
};
