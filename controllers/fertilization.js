const client = require("../db");

exports.getAllferti = async (req, res) => {
  try {
    const query = "SELECT * FROM fertilization;";
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

exports.getfertili = async (req, res) => {
  try {
    const tanggal = req.params.tanggal;
    const query = "SELECT * FROM fertilization WHERE timestamp = $1";
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

exports.postFerti = async (req, res) => {
  try {
    const { dosisN, dosisP, dosisK, hst, petak } = req.body;

    const ferti_query = `INSERT INTO fertilization (timestamp, dosisN, dosisP, dosisK, hst, petak) VALUES ($1, $2, $3, $4, $5)`;
    const ferti_val = [req.requestTime, dosisN, dosisP, dosisK, hst, petak];

    await client.query(query, values);
    await client.query(ferti_query, ferti_val);

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
