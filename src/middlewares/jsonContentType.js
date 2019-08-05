module.exports = (req, res, next) => {
  const currentContentType = res.get('Content-Type');

  if (!currentContentType) {
    res.header('Content-Type', 'application/json');
  }

  return next();
};
