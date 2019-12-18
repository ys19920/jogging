const User = require('../../../models/user');
module.exports = {
  users: (_, args, { req, res }) => {
    if (!req.user) throw new Error('You must logged in');
    return User.find({});
  },
  user: (parent, args) => {
    return User.findById(args.id);
  }
};
