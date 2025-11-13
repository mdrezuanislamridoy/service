import { Router } from "express";
import { createUser, logout, profileData } from "./user.controller.js";
import auth from "../../middlewares/auth.js";
const router = Router();

router.post("/register", createUser);
router.get("/profile", auth, profileData);
router.post("/logout", auth, logout);

export const UserRouter = router;
