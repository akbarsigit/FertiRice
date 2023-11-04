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

exports.getLatestNPK = async (req, res) => {
  try {
    const petak = req.params.petak;
    const query = `
      SELECT n, p, k FROM nutrisi WHERE petak = $1 ORDER BY timestamp DESC LIMIT 1
    `;

    // console.log(petak);
    const values = [petak];

    const result = await client.query(query, values);
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

exports.getPetakNPK = async (req, res) => {
  try {
    const petak = req.params.petak;
    const query = `
      SELECT timestamp, n, p, k FROM nutrisi WHERE petak = $1 ORDER BY timestamp ASC
    `;

    // console.log(petak);
    const values = [petak];

    const result = await client.query(query, values);
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
