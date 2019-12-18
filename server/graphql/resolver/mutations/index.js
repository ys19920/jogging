const authMutation = require('./auth');
const userMutation = require('./user');

const rootMutation = {
  ...authMutation,
  ...userMutation
};

module.exports = rootMutation;
