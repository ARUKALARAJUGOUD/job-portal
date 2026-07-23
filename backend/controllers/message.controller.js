// controllers/message.controller.js

import mongoose from "mongoose";
import Message from "../models/message.model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const { receiverId, text } = req.body;

    // Validation
    if (!senderId || !receiverId || !text) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const message = await Message.create({
      senderId,
      receiverId,
      text,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.id; // Logged-in user
    const receiverId = req.params.receiverId;

    const messages = await Message.find({
      $or: [
        {
          senderId,
          receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const markMessageDelivered = async (req, res) => {
  try {
    const { messageId } = req.body;

    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        delivered: true,
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const markMessagesSeen = async (req, res) => {
  try {
    const receiverId = req.id; // logged-in user
    const senderId = req.params.senderId;

    await Message.updateMany(
      {
        senderId,
        receiverId,
        seen: false,
      },
      {
        $set: {
          seen: true,
        },
      },
    );

    return res.status(200).json({
      success: true,
      message: "Messages marked as seen",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const uploadMessage = async (req, res) => {
  try {
    // console.log(req.file);
    const result = await uploadToCloudinary(req.file.buffer, "chat/messages");

    let messageType = "document";

    if (req.file.mimetype.startsWith("image/")) {
      messageType = "image";
    } else if (req.file.mimetype === "application/pdf") {
      messageType = "pdf";
    } else if (req.file.mimetype.startsWith("video/")) {
      messageType = "video";
    } else if (req.file.mimetype.startsWith("audio/")) {
      messageType = "audio";
    }

    console.log(result);

    const message = await Message.create({
      senderId: req.id,

      receiverId: req.body.receiverId,

      text: "",

      messageType,

      fileUrl: result.secure_url,

      fileName: req.file.originalname,

      publicId: result.public_id,

      fileSize: req.file.size,

      delivered: false,

      seen: false,
      mimeType: req.file.mimetype,
    });

    console.log(req.body);

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getRecentChats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.id);

    const recentChats = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }],
        },
      },

      {
        $addFields: {
          otherUser: {
            $cond: [{ $eq: ["$senderId", userId] }, "$receiverId", "$senderId"],
          },
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        $group: {
          _id: "$otherUser",

          lastMessage: {
            $first: "$$ROOT",
          },

          totalMessages: {
            $sum: 1,
          },

          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiverId", userId] },
                    { $eq: ["$seen", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: "$user",
      },

      {
        $project: {
          _id: 0,

          user: {
            _id: "$user._id",
            fullName: "$user.fullName",
            profilePhoto: "$user.profile.url",
            role: "$user.role",
          },

          lastMessage: 1,

          totalMessages: 1,

          unreadCount: 1,
        },
      },

      {
        $sort: {
          "lastMessage.createdAt": -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      recentChats,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
