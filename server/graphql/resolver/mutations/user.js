const User = require('../../../models/user');
module.exports = {
  addUser(parent, args, { req, res }) {
    if (!req.user) throw new Error('You must logged in');
    let newUser = new User({
      name: args.name,
      email: args.email,
      password: args.password
    });
    if (args.role) newUser.role = args.role;
    return newUser.save();
  },
  async updateUser(parent, args, { req, res }) {
    if (!req.user) throw new Error('You must logged in');
    let user = await User.findById(args.id);
    Object.assign(user, { name: args.name, email: args.email });
    if (args.password) user.password = args.password;
    if (args.role) user.role = args.role;
    return await user.save();
  },
  async removeUser(parent, args, { req, res }) {
    if (!req.user) throw new Error('You must logged in');
    let user = await User.findById(args.id);
    return await user.remove();
  }
};
