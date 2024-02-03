const middleware = {
  authToken: require('./auth/authentication'),
  authorization: require('./auth/authorization'),
};

module.exports = middleware;
