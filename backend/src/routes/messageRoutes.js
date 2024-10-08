const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.post("/send", sendMessage);
router.get("/:otherUserId", getMessages);

module.exports = router;
