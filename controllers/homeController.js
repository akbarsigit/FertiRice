const client = require("../db");

exports.getHome = async (req, res) => {
  try {
    const query = `
      SELECT r.*, n.*
      FROM rekomendasi r
      INNER JOIN nutrisi n ON r.timestamp = n.timestamp;
    `;

    const result = await client.query(query);
    const rows = result.rows;

    res.status(200).json({
      status: "success",
      data: {
        requestedAt: req.requestTime,
        data: rows, // Store the joined rows in the 'data' property of the response
      },
    });
  } catch (err) {
    console.error(err.message);

    // Handle the error and send an error response if needed
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching joined data.",
    });
  }
};
