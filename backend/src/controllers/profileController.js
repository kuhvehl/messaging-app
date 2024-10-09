const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio, avatarUrl } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: { bio, avatarUrl },
            update: { bio, avatarUrl },
          },
        },
      },
      include: { profile: true },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params; // Get the userId from the route params

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }, // Convert id to an integer
      include: { profile: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user profile" });
  }
};

module.exports = { getProfile, updateProfile, getUserProfile };
