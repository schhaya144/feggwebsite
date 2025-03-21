const path = require("path");
const fs = require("fs");
const portfolioSchema = require("../model/portfolioSchema");

// Create a new portfolio entry
exports.createPortfolio = async (req, res) => {
  try {
    const { title, links, technologyUsed, description, category } = req.body;
  
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Media files are required." });
    }
  
    const mediaFiles = req.files.map((file) => file.filename);
  
    const portfolio = new portfolioSchema({
      title,
      links,
      technologyUsed,
      description,
      media: mediaFiles,
      category,
    });
  
    await portfolio.save();
    res.status(201).json({ message: "Portfolio created successfully!", portfolio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
   
};


// Fetch all portfolio entries
exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await portfolioSchema.find();
    const updatedPortfolios = portfolios.map((item) => {
      if (item.media?.length) {
        item.media = item.media.map((path) =>
          path.startsWith("/") ? path : `/uploads/${path}`
        );
      }
      return item;
    });
    res.status(200).json(updatedPortfolios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
// get portfolio details by id 
exports.getAllPortfoliosDetails = async (req, res) => {
  try {
    const portfolio = await portfolioSchema.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
exports.updateAllPortfoliosDetails = async (req, res) => {
  const { id } = req.params;
  console.log("Request body:", req.body); // Debugging line
  try {
    const updatedPortfolio = await portfolioSchema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.status(200).json({ message: "Portfolio updated successfully", updatedPortfolio });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation error", details: error.errors });
    } else {
      res.status(400).json({ message: "Error updating portfolio", error });
    }
  }
};




// Delete a portfolio entry
exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await portfolioSchema.findById(id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found." });
    }

    // Check if image exists before attempting to delete
    if (portfolio.image) {
      const imagePath = path.join(__dirname, "../uploads", portfolio.image);
      console.log("Image Path:", imagePath); // Debug log
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await portfolio.deleteOne();
    res.status(200).json({ message: "Portfolio deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

