exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status = 404;
  next(error);
};

exports.errorHandle = (err, req, res, next) => {
  statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status = statusCode;
  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Oops! something's broken"
        : err.stack,
    status: statusCode,
  });
};

// exports.errorHandle = (err, req, res, next) => {
//   err.stack = err.stack || "";
//   const errorDetails = {
//     message: err.message,
//     status: err.status,
//     stackHighlighted: err.stack.replace(
//       /[a-z_-\d]+.js:\d+:\d+/gi,
//       "<mark>$&</mark>"
//     ),
//   };
//   res.status(err.status || 500);
//   res.json(errorDetails);
// };
