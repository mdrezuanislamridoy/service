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
router.get("/getServices", getServicesController);
router.get("/getService", getServiceController);
router.get(
  "/getMyService",
  auth,
  checkRole("provider"),
  getMyServicesController
);

export const ServiceRouter = router;
