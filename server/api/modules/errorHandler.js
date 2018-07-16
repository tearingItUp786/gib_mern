export default (error, req, res) => {
  console.error(error.stack);
  res.status(500).send(error.message || error.toString());
};
