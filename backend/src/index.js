const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/profile", profileRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Messaging App API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
