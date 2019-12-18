const User = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
    },
    // async me(_, args, { user }) {
    //   // make sure user is logged in
    //   if (!user) {
    //     throw new Error('You are not authenticated!');
    //   }

    //   // user is authenticated
    //   return await User.findById(user.id);
    // },
    async login(parent, args) {
      let user = await User.findOne({ email: args.email });
      if (!user) throw new Error('No user with that email');
      let pass = await bcrypt.compare(args.password, user.password);
      if (!pass) {
        throw new Error('Incorrect password');
      }
      return jsonwebtoken.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '1y'
        }
      );
    },
    async signup(parent, args) {
      let user = await new User({
        name: args.name,
        email: args.email,
        password: args.password,
        role: args.role
      });
      await user.save();
      return jsonwebtoken.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '1y'
        }
      );
    }
  }
};
module.exports = { resolvers };
