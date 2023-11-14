const client = require("../db");

exports.getAllEval = async (req, res) => {
  try {
    const query = "SELECT * FROM eval ORDER BY TO_TIMESTAMP(timestamp, 'HH24:MI:SS.DD-MM-YYYY') DESC LIMIT 10;";
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

exports.postEval = async (req, res) => {
  try {
    const { warna, tinggi, lebar, hst, petak } = req.body;

    console.log(hst);

    const query = `INSERT INTO eval (timestamp, warna, tinggi, lebar, hst, petak) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [req.requestTime, warna, tinggi, lebar, hst, petak];

    await client.query(query, values);

    // console.log("Inserted successfully!");
    // console.log("Closed client connection");

    res.status(200).json({
      status: "success",
      data: {
        tanggal: req.requestTime,
      },
    });
  } catch (err) {
    console.error(err.message);
    // Handle the error and send an error response if needed
    res.status(500).json({
      status: "error",
      message: "An error occurred while inserting data.",
    });
  }
};

exports.getEval = async (req, res) => {
  try {
    const tanggal = req.params.tanggal;
    const query = "SELECT * FROM eval WHERE timestamp = $1";
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


exports.statEvalAvg = async (req, res) => {
  try {
    // const tanggal = req.params.tanggal;
    // const query = "SELECT * FROM eval as E Where timestamp = (SELECT max (timestamp) FROM eval as E2 where E.petak = E2.petak)";
    const query = "SELECT petak, AVG(tinggi) as tinggi_avg,AVG(lebar) as lebar_avg FROM eval GROUP BY petak ORDER BY petak;";
    // const query = "WITH NumberedRows AS (SELECT petak, tinggi, lebar, ROW_NUMBER() OVER (PARTITION BY petak ORDER BY (SELECT NULL)) AS rn FROM eval) SELECT petak, AVG(tinggi) AS average_tinggi, AVG(lebar) AS average_lebar FROM NumberedRows GROUP BY petak, (rn - 1) / 3 ORDER BY petak;";

    // const query = "SELECT * FROM eval WHERE timestamp = $1";
    // const values = [tanggal];

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