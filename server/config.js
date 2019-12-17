const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  mongoURL: `mongodb+srv://${process.env.MONGO_USENAME}:${process.env.MONGO_PASSWORD}@react-boilerplate-djfgx.mongodb.net/graphql?retryWrites=true&w=majority`
};
