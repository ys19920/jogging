const User = require('../../../models/user');
module.exports = {
  users: (_, args, { req, res }) => {
    if (!req.user) throw new Error('You must logged in');
    return User.find({});
  },
  user: (parent, args) => {
    return User.findById(args.id);
  },
  currentUser: (_, args, { req, res }) => {
    console.log(args, req.user);
    if (!req.user) throw new Error('You must logged in');
    return User.findById(req.user.id);
  }
};
