const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, 
    pdf: { type: String }, 
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports = Announcement;
