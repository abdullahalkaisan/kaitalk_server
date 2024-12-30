import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessages } from "../controllers/message.controller.js";

const router = express.Router();

// router.get("/users", protectRoute, getUsersForSidebar)
// router.get("/:id", protectRoute, getMessages)

// router.post("/send/:id", protectRoute, sendMessages)

router.get("/users",  getUsersForSidebar)
router.get("/:id", getMessages)

router.post("/send/:id",  sendMessages)

export default router;

