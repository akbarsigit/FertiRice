const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// const config = {
//   host: "fertirice.postgres.database.azure.com",
//   user: "akbar@fertirice",
//   password: process.env.DB_PASS,
//   database: "fertirice_db",
//   port: 5432,
//   ssl: true,
// };

const config = {
  host: "capstone-new.postgres.database.azure.com",
  user: "capstone@capstone-new",
  password: process.env.DB_PASS,
  database: "fertirice_db",
  port: 5432,
  ssl: true,
};

const client = new pg.Client(config);

client.connect((err) => {
  if (err) throw err;
  else {
    console.log(`connected to PSQL server: ${config.host}`);
  }
});

// client.connect((err) => {
//   if (err) throw err;
//   else {
//     queryDatabase();
//   }
// });

// ==================== CREATE NUTRISI TABLE ===========
// function queryDatabase() {
//   const query = `
//       DROP TABLE IF EXISTS nutrisi;
//       CREATE TABLE nutrisi (timestamp VARCHAR(50) PRIMARY KEY, n DECIMAL, p DECIMAL, k DECIMAL, hst INTEGER, petak INTEGER);
//   `;

//   client
//     .query(query)
//     .then(() => {
//       console.log("Table created successfully!");
//       client.end(console.log("Closed client connection"));
//     })
//     .catch((err) => console.log(err))
//     .then(() => {
//       console.log("Finished execution, exiting now");
//       process.exit();
//     });
// };

// ==================== CREATE REKOMENDASI TABLE ===========
// function queryDatabase() {
//   const query = `
//       DROP TABLE IF EXISTS rekomendasi;
//       CREATE TABLE rekomendasi (timestamp VARCHAR(50) PRIMARY KEY, rekomen_n DECIMAL, rekomen_p DECIMAL, rekomen_k DECIMAL, petak INTEGER);
//   `;

//   client
//     .query(query)
//     .then(() => {
//       console.log("Table created successfully!");
//       client.end(console.log("Closed client connection"));
//     })
//     .catch((err) => console.log(err))
//     .then(() => {
//       console.log("Finished execution, exiting now");
//       process.exit();
//     });
// }

// ==================== CREATE eval TABLE ===========
// function queryDatabase() {
//   const query = `
//       DROP TABLE IF EXISTS eval;
//       CREATE TABLE eval (timestamp VARCHAR(50) PRIMARY KEY, warna INTEGER, tinggi DECIMAL, lebar DECIMAL, hst INTEGER, petak INTEGER);
//   `;

//   client
//     .query(query)
//     .then(() => {
//       console.log("Table created successfully!");
//       client.end(console.log("Closed client connection"));
//     })
//     .catch((err) => console.log(err))
//     .then(() => {
//       console.log("Finished execution, exiting now");
//       process.exit();
//     });
// }

// ==================== CREATE fertilization TABLE ===========
// function queryDatabase() {
//   const query = `
//       DROP TABLE IF EXISTS fertilization;
//       CREATE TABLE fertilization (timestamp VARCHAR(50) PRIMARY KEY, dosisN DECIMAL, dosisP DECIMAL, dosisK DECIMAL, hst INTEGER, petak INTEGER);
//   `;

//   client
//     .query(query)
//     .then(() => {
//       console.log("Table created successfully!");
//       client.end(console.log("Closed client connection"));
//     })
//     .catch((err) => console.log(err))
//     .then(() => {
//       console.log("Finished execution, exiting now");
//       process.exit();
//     });
// }

// ==================== CREATE dosageRecomendation TABLE ===========
// function queryDatabase() {
//   const query = `
//       DROP TABLE IF EXISTS dosageRecomendation;
//       CREATE TABLE dosageRecomendation (timestamp VARCHAR(50) PRIMARY KEY, dosageRecomendationN DECIMAL, dosageRecomendationP DECIMAL, dosageRecomendationK DECIMAL, petak INTEGER);
//   `;

//   client
//     .query(query)
//     .then(() => {
//       console.log("Table created successfully!");
//       client.end(console.log("Closed client connection"));
//     })
//     .catch((err) => console.log(err))
//     .then(() => {
//       console.log("Finished execution, exiting now");
//       process.exit();
//     });
// }

// function queryDatabase() {
//   const query = `
//       INSERT INTO dosageRecomendation (timestamp, dosageRecomendationN, dosageRecomendationP, dosageRecomendationK, petak) VALUES ('06:45:54.05-11-2023', 330, 330, 330, 5)
//   `;

//   client
//     .query(query)
//     .then(() => {
//       console.log("Table created successfully!");
//       client.end(console.log("Closed client connection"));
//     })
//     .catch((err) => console.log(err))
//     .then(() => {
//       console.log("Finished execution, exiting now");
//       process.exit();
//     });
// }


module.exports = client;
