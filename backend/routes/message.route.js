import express from "express";
import {
  getMessages,
  getRecentChats,
  markMessageDelivered,
  markMessagesSeen,
  sendMessage,
  uploadMessage,
} from "../controllers/message.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/send", isAuthenticated, sendMessage);

router.put("/delivered", isAuthenticated, markMessageDelivered);

router.post("/upload", isAuthenticated, upload.single("file"), uploadMessage);

router.put("/seen/:senderId", isAuthenticated, markMessagesSeen);

router.get("/recent", isAuthenticated, getRecentChats);

router.get("/:receiverId", isAuthenticated, getMessages);

export default router;
