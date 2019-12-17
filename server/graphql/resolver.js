const User = require('../models/user');
const resolvers = {
  Query: {
    users: () => User.find({}),
    user: (parent, args) => {
      return User.findById(args.id);
    }
  },
  Mutation: {
    addUser(parent, args) {
      let newUser = new User({
        name: args.name,
        email: args.email,
        password: args.password
      });
      if (args.role) newUser.role = args.role;
      return newUser.save();
    },
    async updateUser(parent, args) {
      let user = await User.findById(args.id);
      Object.assign(user, { name: args.name, email: args.email });
      if (args.password) user.password = args.password;
      if (args.role) user.role = args.role;
      return await user.save();
    },
    async removeUser(parent, args) {
      let user = await User.findById(args.id);
      return await user.remove();
    }
  }
};
module.exports = { resolvers };
