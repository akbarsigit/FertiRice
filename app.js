const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const nutrisiController = require("./controllers/nutrisiController");
const rekomendasiController = require("./controllers/rekomendasiController");
const evalController = require("./controllers/evalController");
const cors = require("cors");
const homeController = require("./controllers/homeController");
// const pool = require("./db");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  const currentDate = new Date();
  const hh = String(currentDate.getUTCHours()).padStart(2, "0");
  const min = String(currentDate.getUTCMinutes()).padStart(2, "0");
  const sec = String(currentDate.getUTCSeconds()).padStart(2, "0"); // Get the seconds component
  const dd = String(currentDate.getUTCDate()).padStart(2, "0");
  const mm = String(currentDate.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const yyyy = currentDate.getUTCFullYear();

  req.requestTime = `${hh}:${min}:${sec}-${dd}-${mm}-${yyyy}`;
  next();
});

// const router = express.Router();

app.param("tanggal", (req, res, next, val) => {
  console.log(`tanggal : ${val}`);
  next();
});

app.route("/api/").get(homeController.getHome);

app
  .route("/api/nutrisi")
  .get(nutrisiController.getAllNutrisi)
  .post(nutrisiController.postNutrisi);
app.route("/api/nutrisi/:tanggal").get(nutrisiController.getNutrisi);

app.route("/api/rekomendasi").get(rekomendasiController.getAllRekomendasi);

app
  .route("/api/rekomendasi/:tanggal")
  .get(rekomendasiController.getRekomendasi);

app
  .route("/api/eval")
  .get(evalController.getAllEval)
  .post(evalController.postEval);

app.route("/api/eval/:tanggal").get(evalController.getEval);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on Port ${port}...`);
});
