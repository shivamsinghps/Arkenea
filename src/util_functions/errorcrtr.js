module.exports = (a, b) => {
  const error = new Error(a);
  error.status = b;
  return error;
};
