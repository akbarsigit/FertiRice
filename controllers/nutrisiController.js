const client = require("../db");

exports.getAllNutrisi = async (req, res) => {
  try {
    const query = "SELECT * FROM nutrisi;";
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

    // If you want to log the rows as well
    // rows.forEach((row) => {
    //   console.log(`Read: ${JSON.stringify(row)}`);
    // });
  } catch (err) {
    console.log(err);

    // Handle the error and send an error response if needed
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching data.",
    });
  }
};

exports.postNutrisi = async (req, res) => {
  try {
    const { n, p, k, petak } = req.body;

    const query = `INSERT INTO nutrisi (tanggal, n, p, k, petak) VALUES ($1, $2, $3, $4, $5)`;
    const values = [req.requestTime, n, p, k, petak];

    await client.query(query, values);

    console.log("Inserted successfully!");
    console.log("Closed client connection");
    // If you want to exit the process, you can uncomment the line below
    // process.exit();

    // const dataNutrisi = Object.assign({ tanggal: req.requestTime }, req.body);
    res.status(200).json({
      status: "success",
      data: {
        tanggal: req.requestTime,
        query: query,
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

exports.getNutrisi = async (req, res) => {
  try {
    const tanggal = req.params.tanggal;
    const query = "SELECT * FROM nutrisi WHERE timestamp = $1";
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
