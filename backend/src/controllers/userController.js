// backend/src/controllers/userController.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const users = await prisma.user.findMany({
      where: {
        id: { not: currentUserId }, // Exclude the current user
      },
      select: {
        id: true,
        username: true,
        profile: {
          select: {
            avatarUrl: true,
          },
        },
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

module.exports = { getAllUsers };
