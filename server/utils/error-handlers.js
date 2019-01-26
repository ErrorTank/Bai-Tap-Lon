const handlers = {
  AuthorizationError: (res, error) => res.status(401).json({
    message: error.message,
    extra: error.extra
  }),
  Error: (res, error) => res.status(400).json({
    message: error.message,
    extra: error.extra
  })
};

module.exports = (err, req, res, next) => {
  const errorHandler = handlers[err.name] || null;
  if (errorHandler) {
    console.error(err);
    errorHandler(res, err);
  } else {
    next();
  }
};
