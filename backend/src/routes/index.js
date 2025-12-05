import express from "express";

import authRoute from "./auth.route.js";
import vehicleRoute from "./vehicle.route.js";
import contractsRoutes from "./contract.route.js";
import contractsTemplateRoute from "./contract-template.route.js";
import customerRoute from "./customer.route.js";
const router = express.Router();

// Define routes
const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/vehicle",
    route: vehicleRoute,
  },
  {
    path: "/contracts",
    route: contractsRoutes,
  },

  {
    path: "/contract-template",
    route: contractsTemplateRoute,
  },
  {
    path: "/customer",
    route: customerRoute,
  },
  // {
  //   path: "/file",
  //   route: fileRoute,
  // },
];
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your JWT token here
 */
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
