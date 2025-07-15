const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  noticeTitle: { type: String, required: true },
  noticeDescription: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
