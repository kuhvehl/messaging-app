// backend/src/routes/userRoutes.js
const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllUsers);

module.exports = router;
