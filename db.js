const pg = require("pg");

const config = {
  host: "fertirice.postgres.database.azure.com",
  // Do not hard code your username and password.
  // Consider using Node environment variables.
  user: "akbar@fertirice",
  password: "Capstone1",
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
//       CREATE TABLE nutrisi (timestamp VARCHAR(50) PRIMARY KEY, n INTEGER, p INTEGER, k INTEGER, petak INTEGER);
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
//       CREATE TABLE rekomendasi (timestamp VARCHAR(50) PRIMARY KEY, rekomen_n INTEGER, rekomen_p INTEGER, rekomen_k INTEGER, petak INTEGER);
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
//       CREATE TABLE eval (timestamp VARCHAR(50) PRIMARY KEY, warna INTEGER, tinggi DECIMAL, petak INTEGER);
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
