import express from "express";
import { getCurrentUser, updateProfile } from "../Controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/me", protect, getCurrentUser);
router.patch("/me", protect, updateProfile);

export default router;
