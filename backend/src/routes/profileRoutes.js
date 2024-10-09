const express = require("express");
const {
  getProfile,
  updateProfile,
  getUserProfile,
} = require("../controllers/profileController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getProfile);
router.put("/", updateProfile);
router.get("/:id", getUserProfile);

module.exports = router;
