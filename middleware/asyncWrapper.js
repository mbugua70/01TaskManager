const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      // with next you pass the error to the next middleware
      next(err);
    }
  };
};

module.exports = asyncWrapper;
