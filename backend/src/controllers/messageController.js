const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.user.id;

    // Convert recipientId to a number
    const recipientIdNum = parseInt(recipientId, 10);

    // Check if recipient exists
    const recipient = await prisma.user.findUnique({
      where: { id: recipientIdNum },
    });

    if (!recipient) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        recipientId: recipientIdNum,
      },
      include: {
        sender: {
          select: { id: true, username: true },
        },
        recipient: {
          select: { id: true, username: true },
        },
      },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res
      .status(500)
      .json({ error: "Error sending message", details: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId: parseInt(otherUserId) },
          { senderId: parseInt(otherUserId), recipientId: userId },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        sender: {
          select: { id: true, username: true },
        },
        recipient: {
          select: { id: true, username: true },
        },
      },
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving messages" });
  }
};

module.exports = { sendMessage, getMessages };
