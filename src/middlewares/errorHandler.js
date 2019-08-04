module.exports = (err, req, res, next) => {
  if (err) {
    console.error(`Error: ${err.stack}`);

    return res.status(500).send({ message: `InternalServerError: ${err.message}` });
  }

  return next();
};
