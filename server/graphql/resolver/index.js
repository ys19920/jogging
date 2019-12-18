const mutations = require('./mutations');
const quries = require('./queries');

const resolvers = {
  Query: { ...quries },
  Mutation: { ...mutations }
};

module.exports = { resolvers };
