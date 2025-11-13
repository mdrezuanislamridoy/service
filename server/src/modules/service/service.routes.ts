import { Router } from "express";
import auth from "../../middlewares/auth.js";
import checkRole from "../../middlewares/checkRole.js";
import {
  createServiceController,
  getMyServicesController,
  getServiceController,
  getServicesController,
} from "./service.controller.js";

const router = Router();

router.post("/create", auth, checkRole("provider"), createServiceController);
router.get("/get-services", getServicesController);
router.get("/get-service", getServiceController);
router.get(
  "/get-my-service",
  auth,
  checkRole("provider"),
  getMyServicesController
);

export const ServiceRouter = router;
