import express from "express";
import userController from "../controllers/userController";
import profileController from "../controllers/profileController";
import { authenticateToken } from "../middleware/authAuthentication";

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

router.get("/profile", authenticateToken, profileController.getProfile);

export default router;
