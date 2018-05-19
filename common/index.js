const wait = (ms, data) => {
  return new Promise(resolve => setTimeout(() => resolve(data), ms));
};

module.exports = {
  wait
};
