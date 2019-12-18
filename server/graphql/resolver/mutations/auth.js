const User = require('../../../models/user');
module.exports = {
  async login(_, args, { req, res }) {
    let user = await User.findOne({ email: args.email });
    if (!user) throw new Error('No user with that email');
    let pass = await bcrypt.compare(args.password, user.password);
    if (!pass) {
      throw new Error('Incorrect password');
    }
    const token = jsonwebtoken.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );
    return { userId: user.id, token: token, tokenExpiration: '1d' };
  },
  async signup(parent, args) {
    let user = await new User({
      name: args.name,
      email: args.email,
      password: args.password,
      role: args.role
    });
    await user.save();
    const token = jsonwebtoken.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );
    return { userId: user.id, token: token, tokenExpiration: '1d' };
  }
};
