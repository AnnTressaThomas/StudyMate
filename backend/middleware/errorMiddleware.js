// Error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Handle Mongoose CastError (e.g., malformed ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Resource not found with id of ${err.value}`,
    });
  }

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
