exports.getAllEval = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      requestedAt: req.requestTime,
    },
  });
};

exports.postEval = (req, res) => {
  const dataEval = Object.assign({ tanggal: req.requestTime }, req.body);
  res.status(200).json({
    status: "success",
    data: {
      Eval: dataEval,
    },
  });
};

exports.getEval = (req, res) => {
  const tanggal = req.params.tanggal;
  res.status(200).json({
    status: "success",
    data: {
      tanggal: tanggal,
    },
  });
};
