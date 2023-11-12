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
    
    // let rekomendasi_n = 30;
    // let rekomendasi_p = 30;
    // let rekomendasi_k = 30;
    // ======== Rekomendasi K ============
    // // rendah
    // if (k < 20) {
    //   rekomendasi_k = 100;
    // }
    // // sedang & tinggi
    // else if (k >= 20) {
    //   rekomendasi_k = 50;
    // }
    // // ======== Rekomendasi P ============
    // // rendah
    // if (p < 20) {
    //   rekomendasi_p = 100;
    // }
    // //sedang
    // else if (p >= 20 && p <= 40) {
    //   rekomendasi_p = 75;
    // }
    // // tinggi
    // else if (p > 40) {
    //   rekomendasi_p = 50;
    // }
    // ========= Rekomendasi N ===================
    // // rendah
    // if (n < 20) {
    //   rekomendasi_n = 100;
    // }
    // //sedang
    // else if (n >= 20 && n <= 40) {
    //   rekomendasi_n = 75;
    // }
    // // tinggi
    // else if (n > 40) {
    //   rekomendasi_n = 50;
    // }


    // METODE 2
    const dosage = "SELECT dosageRecomendationN, dosageRecomendationP, dosageRecomendationK FROM dosageRecomendation where petak = $1 order by timestamp DESC LIMIT 1;";
    const param = [petak];
    const dosageResponse = await client.query(dosage, param);
    const dosageData = dosageResponse.rows;
    const { dosageRecomendationn: dosageRecN, dosageRecomendationp: dosageRecP, dosageRecomendationk: dosageRecK} = dosageData[0];

    // const prevNPK = "SELECT timestamp, n, p, k, hst, petak FROM nutrisi as n Where timestamp = (SELECT max (timestamp) FROM nutrisi as n2 where n.petak = n2.petak);"
    const prevNPK = "SELECT n, p, k, petak FROM nutrisi where petak = $1 order by timestamp DESC LIMIT 1;"

    const prevNPKResponse = await client.query(prevNPK, param);
    const prevNPKData = prevNPKResponse.rows;

    // const { nDb, pDb, kDb, petakDb } = prevNPKData[0]
    const { n: nDb, p: pDb, k: kDb, petak: petakDb } = prevNPKData[0];

    // high
    if ((nDb >= 24 && n >= 24) || (pDb >= 24 && p >= 24) || (kDb >= 24 && k >= 24) || (nDb <= 8 && n >= 24) || (pDb <= 8 && p >= 24) || (kDb <= 8 && k >= 24)){
      dosageRecN = dosageRecN - 50
      dosageRecP = dosageRecP - 50
      dosageRecK = dosageRecK - 50
    }
    // low
    else if ((nDb <= 8 && n <= 8) || (pDb <= 8 && p <= 8) || (kDb <= 8 && k <= 8) || (nDb >= 24 && n <= 8) || (pDb >= 24 && p <= 8) || (kDb >= 24 && k <= 8)){
      dosageRecN = dosageRecN + 50
      dosageRecP = dosageRecP + 50
      dosageRecK = dosageRecK + 50
    }
    
    // console.log(prevNPKData[0])


    const rekomen_query = `INSERT INTO dosagerecomendation (timestamp, dosagerecomendationn, dosagerecomendationp, dosagerecomendationk, petak) VALUES ($1, $2, $3, $4, $5)`;
    const rekomen_val = [
      req.requestTime,
      dosageRecN,
      dosageRecP,
      dosageRecK,
      petak,
    ];

    const query = `INSERT INTO nutrisi (timestamp, n, p, k, hst, petak) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [req.requestTime, n, p, k, hst, petak];

    await client.query(query, values);
    await client.query(rekomen_query, rekomen_val);

    console.log("Inserted successfully!");

    res.status(200).json({
      status: "success",
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
