const client = require("../db");

exports.getAllRekomendasi = async (req, res) => {
  try {
    const query = "SELECT * FROM dosagerecomendation;";
    const result = await client.query(query);
    const rows = result.rows;

    // Send the rows as a JSON response
    res.status(200).json({
      status: "success",
      data: {
        requestedAt: req.requestTime,
        data: rows, // Store the rows in the 'rows' property of the response
      },
    });

  } catch (err) {
    console.log(err);

    // Handle the error and send an error response if needed
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching data.",
    });
  }
};

exports.getRekomendasi = async (req, res) => {
  try {
    const tanggal = req.params.tanggal;
    const query = "SELECT * FROM dosagerecomendation WHERE timestamp = $1";
    const values = [tanggal];

    const result = await client.query(query, values);
    const rows = result.rows;

    res.status(200).json({
      status: "success",
      data: {
        tanggal: tanggal,
        data: rows,
      },
    });
  } catch (err) {
    console.error(err.message);

    // Handle the error and send an error response if needed
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching data.",
    });
  }
};

exports.getRekomendasPetak = async (req, res) => {
  try {
    const query = "SELECT timestamp, dosagerecomendationn, dosagerecomendationp, dosagerecomendationk, petak FROM dosagerecomendation as D Where timestamp = (SELECT max (timestamp) FROM dosagerecomendation as D2 where D.petak = D2.petak)";

    const result = await client.query(query);
    const rows = result.rows;

    res.status(200).json({
      status: "success",
      data: {
        data: rows,
      },
    });
  } catch (err) {
    console.error(err.message);

    // Handle the error and send an error response if needed
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching data.",
    });
  }
};

