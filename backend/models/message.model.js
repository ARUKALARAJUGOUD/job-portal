import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Used for normal text messages
    text: {
      type: String,
      trim: true,
      default: "",
    },

    // What kind of message is this?
    messageType: {
      type: String,
      enum: ["text", "image", "pdf", "document", "video", "audio"],
      default: "text",
    },

    // Cloudinary URL
    fileUrl: {
      type: String,
      default: "",
    },

    // Original uploaded file name
    fileName: {
      type: String,
      default: "",
    },

    // Cloudinary public_id
    publicId: {
      type: String,
      default: "",
    },

    // File size in bytes
    fileSize: {
      type: Number,
      default: 0,
    },

    delivered: {
      type: Boolean,
      default: false,
    },

    seen: {
      type: Boolean,
      default: false,
    },
    mimeType: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({
  senderId: 1,
  receiverId: 1,
  createdAt: -1,
});

export default mongoose.model("Message", messageSchema);
