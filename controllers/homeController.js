// const pool = require("../db");

exports.getHome = (req, res) => {
  try {

    res.status(200).json({
      status: "success",
      data: {
        requestedAt: req.requestTime,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};
