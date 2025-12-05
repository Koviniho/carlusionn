import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SWAGGER_STAGE_URL } from "./src/config/env.config.js";

let spec;
try {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        version: "1.0.0",
      },
    },
    apis: ["./src/routes/*.js"],
  };

  // Generate the Swagger spec
  spec = swaggerJSDoc(options);
} catch (error) {
  console.error("Error generating Swagger spec:", error.message);
}

let swaggerServe;
let swaggerSetup;
try {
  // Serve and set up the Swagger UI
  swaggerServe = swaggerUi.serve;
  swaggerSetup = swaggerUi.setup(spec);
} catch (error) {
  console.error("Error setting up Swagger UI:", error.message);
}

export { swaggerServe, swaggerSetup };
