module.exports = function catchAsyncError(fn) {
  console.log("hi from error handeling");

  return (req, res, next) => {
    console.log("hi from error handeling");
    fn(req, res).catch((err) => {
      res.json(err);
    });
  };
};
