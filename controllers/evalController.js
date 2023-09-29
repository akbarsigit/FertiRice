exports.getAllEval = (req, res) => {
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

exports.postEval = (req, res) => {
  try {
    const dataEval = Object.assign({ tanggal: req.requestTime }, req.body);
    res.status(200).json({
      status: "success",
      data: {
        Eval: dataEval,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.getEval = (req, res) => {
  try {
    const tanggal = req.params.tanggal;
    res.status(200).json({
      status: "success",
      data: {
        tanggal: tanggal,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};
