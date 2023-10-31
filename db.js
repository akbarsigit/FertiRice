const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const config = {
  host: "fertirice.postgres.database.azure.com",
  user: "akbar@fertirice",
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
// }

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

module.exports = client;
