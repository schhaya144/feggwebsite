const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  links: { type: String, required: true, trim: true },
  technologyUsed: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  media: { type: [String], required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "seo",
      "content-marketing",
      "email-marketing",
      "social-media-marketing",
      "frontend-development",
      "backend-development",
      "fullstack-development",
      "web-design",
      "logo-design",
      "brochure-design",
      "social-media-graphics",
      "website-design",
      "ios-development",
      "android-development",
      "cross-platform-development",
      "ui-ux-design",
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
