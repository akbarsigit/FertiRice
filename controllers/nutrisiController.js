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
    const { n, p, k, hst, petak } = req.body;

    // METODE 1
    // ======== Rekomendasi K ============
    let rekomendasi_n = 30;
    let rekomendasi_p = 30;
    let rekomendasi_k = 30;

    // rendah
    if (k < 20) {
      rekomendasi_k = 100;
    }
    // sedang & tinggi
    else if (k >= 20) {
      rekomendasi_k = 50;
    }
    // ======== Rekomendasi P ============
    // rendah
    if (p < 20) {
      rekomendasi_p = 100;
    }
    //sedang
    else if (p >= 20 && p <= 40) {
      rekomendasi_p = 75;
    }
    // tinggi
    else if (p > 40) {
      rekomendasi_p = 50;
    }

    const rekomen_query = `INSERT INTO rekomendasi (timestamp, rekomen_n, rekomen_p, rekomen_k, petak) VALUES ($1, $2, $3, $4, $5)`;
    const rekomen_val = [
      req.requestTime,
      rekomendasi_n,
      rekomendasi_p,
      rekomendasi_k,
      petak,
    ];

    const query = `INSERT INTO nutrisi (timestamp, n, p, k, hst, petak) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [req.requestTime, n, p, k, hst, petak];

    await client.query(query, values);
    await client.query(rekomen_query, rekomen_val);

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
