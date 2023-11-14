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
    const dosage = "SELECT dosageRecomendationN, dosageRecomendationP, dosageRecomendationK FROM dosageRecomendation where petak = $1 ORDER BY TO_TIMESTAMP(timestamp, 'HH24:MI:SS.DD-MM-YYYY') DESC LIMIT 1;";
    const param = [petak];
    const dosageResponse = await client.query(dosage, param);
    const dosageData = dosageResponse.rows;
    
    let { dosagerecomendationn: dosageRecN, dosagerecomendationp: dosageRecP, dosagerecomendationk: dosageRecK} = dosageData[0];
    

    dosageRecN = parseFloat(dosageRecN)
    dosageRecP = parseFloat(dosageRecP)
    dosageRecK = parseFloat(dosageRecK)


    // const prevNPK = "SELECT timestamp, n, p, k, hst, petak FROM nutrisi as n Where timestamp = (SELECT max (timestamp) FROM nutrisi as n2 where n.petak = n2.petak);"
    const prevNPK = "SELECT n, p, k, petak FROM nutrisi where petak = $1 ORDER BY TO_TIMESTAMP(timestamp, 'HH24:MI:SS.DD-MM-YYYY') DESC LIMIT 1;"

    const prevNPKResponse = await client.query(prevNPK, param);
    const prevNPKData = prevNPKResponse.rows;

    // const { nDb, pDb, kDb, petakDb } = prevNPKData[0]
    let { n: nDb, p: pDb, k: kDb, petak: petakDb } = prevNPKData[0];

    nDb = parseFloat(nDb)
    pDb = parseFloat(pDb)
    kDb = parseFloat(kDb)

    // high
    // if ((nDb >= 24 && n >= 24) || (pDb >= 24 && p >= 24) || (kDb >= 24 && k >= 24) || (nDb <= 8 && n >= 24) || (pDb <= 8 && p >= 24) || (kDb <= 8 && k >= 24)){
    //   dosageRecN = dosageRecN - 50
    //   dosageRecP = dosageRecP - 50
    //   dosageRecK = dosageRecK - 50
    // }
    // // low
    // else if ((nDb <= 8 && n <= 8) || (pDb <= 8 && p <= 8) || (kDb <= 8 && k <= 8) || (nDb >= 24 && n <= 8) || (pDb >= 24 && p <= 8) || (kDb >= 24 && k <= 8)){
    //   dosageRecN = dosageRecN + 50
    //   dosageRecP = dosageRecP + 50
    //   dosageRecK = dosageRecK + 50
    // }

    const isHigh = val => val >= 24;
    const isLow = val => val <= 8;

    if (isLow(nDb) || isHigh(nDb)) {
      if(isLow(n)){
        dosageRecN += 50
      }else if (isHigh(n)){
        dosageRecN -= 50
      }
    }
    if (isLow(pDb) || isHigh(pDb)) {
      if(isLow(p)){
        dosageRecP += 50
      }else if (isHigh(p)){
        dosageRecP -= 50
      }
    }
    if (isLow(kDb) || isHigh(kDb)) {
      if(isLow(k)){
        dosageRecK += 50
      }else if (isHigh(k)){
        dosageRecK -= 50
      }
    }

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
      message: err.message,
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
