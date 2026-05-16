const analyticsService = require("../services/analytics.service");

exports.getOverview = async (req, res) => {
  try {
    const data = await analyticsService.getOverview();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};