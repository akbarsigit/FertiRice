const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const nutrisiController = require("./controllers/nutrisiController");
const rekomendasiController = require("./controllers/rekomendasiController");
const evalController = require("./controllers/evalController");
const cors = require("cors");
const homeController = require("./controllers/homeController");

const fertilizationController = require("./controllers/fertilization");

// const pool = require("./db");

dotenv.config({ path: "./config.env" });

const app = express();

// app.use(cors());
var corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  const currentDate = new Date();
  currentDate.setUTCHours(currentDate.getUTCHours() + 7); // Adjust for GMT+7
  const hh = String(currentDate.getHours()).padStart(2, "0");
  const min = String(currentDate.getMinutes()).padStart(2, "0");
  const sec = String(currentDate.getSeconds()).padStart(2, "0");
  const dd = String(currentDate.getDate()).padStart(2, "0");
  const mm = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const yyyy = currentDate.getFullYear();

  req.requestTime = `${hh}:${min}:${sec}.${dd}-${mm}-${yyyy}`;
  next();
});

// const router = express.Router();

app.param("tanggal", (req, res, next, val) => {
  console.log(`tanggal : ${val}`);
  next();
});

// Main Dashboard Route
app.route("/api/").get(homeController.getHome);

// Stats Route
app.route("/api/npk/latest/:petak").get(homeController.getLatestNPK);
app.route("/api/npk/:petak").get(homeController.getPetakNPK);

// Nutrisi Route
app
  .route("/api/nutrisi")
  .get(nutrisiController.getAllNutrisi)
  .post(nutrisiController.postNutrisi);
app.route("/api/nutrisi/:tanggal").get(nutrisiController.getNutrisi);

// Rekomendasi Route
app.route("/api/rekomendasi").get(rekomendasiController.getAllRekomendasi);
app
  .route("/api/rekomendasi/:tanggal")
  .get(rekomendasiController.getRekomendasi);

// Eval Route
app
  .route("/api/eval")
  .get(evalController.getAllEval)
  .post(evalController.postEval);
app.route("/api/eval/:tanggal").get(evalController.getEval);

// Fertilization Route
app
  .route("/api/fertilization")
  .get(fertilizationController.getAllferti)
  .post(fertilizationController.postFerti);
app
  .route("/api/fertilization/:tanggal")
  .get(fertilizationController.getfertili);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on Port ${port}...`);
});
