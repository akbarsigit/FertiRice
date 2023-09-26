const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const nutrisiController = require("./controllers/nutrisiController");
const rekomendasiController = require("./controllers/rekomendasiController");
const evalController = require("./controllers/evalController");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toUTCString();
  next();
});

// const router = express.Router();

app.param("tanggal", (req, res, next, val) => {
  console.log(`tanggal : ${val}`);
  next();
});

app.route("/").get();

app
  .route("/nutrisi")
  .get(nutrisiController.getAllNutrisi)
  .post(nutrisiController.postNutrisi);
app.route("/nutrisi/:tanggal").get(nutrisiController.getNutrisi);

app.route("/rekomendasi").get(rekomendasiController.getAllRekomendasi);
app.route("/rekomendasi/:tanggal").get(rekomendasiController.getRekomendasi);

app.route("/eval").get(evalController.getAllEval).post(evalController.postEval);
app.route("/eval/:tanggal").get(evalController.getEval);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on Port ${port}...`);
});
