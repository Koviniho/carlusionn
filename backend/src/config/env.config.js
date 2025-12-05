import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const {
  MONGO_URI,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  SERVER_URL,
  JWT_EXPIRES_IN,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET,
} = process.env;

const SWAGGER_STAGE_URL = `http://localhost:${PORT}/api`;

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

export {
  MONGO_URI,
  PORT,
  SWAGGER_STAGE_URL,
  ALLOWED_ORIGINS,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET,
};
